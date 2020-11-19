from flask import Blueprint, jsonify, request
from . import db 
from werkzeug.utils import secure_filename
import json
import os
import subprocess
from sqlalchemy.sql import text

main = Blueprint('main', __name__)

@main.route('/calculate_wpi_single', methods=['POST'])
def calculate_wpi_single():

    wpi_data = request.form
    print(wpi_data)
    wpi = {"wpi": "25"}
    return json.dumps(wpi)

@main.route('/calculate_wpi_csv', methods=['POST'])
def calculate_wpi_csv():
    wpi_data = request.form
    print(wpi_data)
    selectedFiles = request.files['selectedFile']
    filename = "data.txt"
    print(filename)
    selectedFiles.save(filename)
    return 'Success'    

