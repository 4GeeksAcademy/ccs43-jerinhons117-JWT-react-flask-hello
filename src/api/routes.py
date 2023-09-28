"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash,check_password_hash
import bcrypt

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route('/signup', methods=["POST"])
def create_user():
    body = request.json
    email = body.get("email")
    password = body.get("password")
    salt=str(bcrypt.gensalt(14))
    password_hash= generate_password_hash(password + salt)

    user_exist = User.query.filter_by(email=email).one_or_none()
    if user_exist is not None:
        return jsonify({
            "message": "User already exists"
        }), 400
    
    new_user = User(
        email = email,
        password = password,
        salt = salt,
        password_hash = password_hash
    )

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "message": "an internal error occurred",
            "error": error.args
        }), 500
    
    return jsonify({
        "message": "created user"
    }), 201


@api.route('/login', methods=["POST"])
def login():
    body =  request.json
    email = body.get("email")
    password = body.get("password")

    if email is None or password is None:
        return jsonify({
            "message": "email and password required"
        }), 400
    
    user = User.query.filter_by(email=email).one_or_none()

    if user is None:
        return jsonify({
            "message": "Invalid credential"
        }), 400
    
    password_is_valid= check_password_hash(user.password_hash,password + user.salt)

    if not password_is_valid:
        return jsonify({
           "message": "email and password required"
        }), 400
    
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "token": access_token 
    }), 201

    @api.route('/private', methods=["GET"])
    @jwt_required()
    def get_user():
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        return jsonify(user.serialize()), 201