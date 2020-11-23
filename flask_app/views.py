from flask import Blueprint, jsonify, request
from . import db 
from werkzeug.utils import secure_filename
import json
import os
import subprocess
from sqlalchemy.sql import text
from .wpi import calculate_wpi
from .multiwpi import WPI
from flask import Flask, render_template, request, redirect, send_from_directory, jsonify
from werkzeug.utils import secure_filename
from .drought_indices import Drought
import pandas as pd

main = Blueprint('main', __name__)
drought = Drought()
wpiclass = WPI()

@main.route('/send_discharge_data', methods = ['POST'])
def send_discharge_data():
	if request.method == 'POST':
		df = pd.read_csv(request.files['file'],index_col=0, parse_dates=True, squeeze=True)
		drought.set_discharge(df)
		return jsonify(success=True)
	return jsonify(success=False)

@main.route('/send_precip_data', methods = ['POST'])
def send_precip_data():
	if request.method == 'POST':
		df = pd.read_csv(request.files['file'],index_col=0, parse_dates=True, squeeze=True)
		drought.set_precip(df)
		return jsonify(success=True)
	return jsonify(success=False)

@main.route('/get_indices', methods = ['GET'])
def get_indices():
	if request.method == 'GET':
		start, end = request.args.get('start'), request.args.get('end')
		sdi, spi, dates = drought.get_indices(start, end)
		return jsonify({'sdi':list(sdi), 'spi':list(spi), 'dates':dates})
	return jsonify(success=False)

@main.route('/get_data', methods = ['GET'])
def get_data():
	if request.method == 'GET':
		start, end = request.args.get('start'), request.args.get('end')
		dis, pre = drought.get_discharge(start, end), drought.get_precip(start, end)
		dates = drought.get_dates(start, end)
		return jsonify({'dates':dates, 'discharge':list(dis), 'precip':list(pre)})
	return jsonify(success=False)

@main.route('/get_yearly_indices', methods = ['GET'])
def get_yearly_indices():
	if request.method == 'GET':
		start, end = request.args.get('start'), request.args.get('end')
		sdi, spi, dates = drought.get_yearly_indices(start, end)
		return jsonify({'sdi':list(sdi), 'spi':list(spi), 'dates':dates})
	return jsonify(success=False)

@main.route('/get_yearly_data', methods = ['GET'])
def get_yearly_data():
	if request.method == 'GET':
		start, end = request.args.get('start'), request.args.get('end')
		dis, pre = drought.get_yearly_discharge(start, end), drought.get_yearly_precip(start, end)
		dates = drought.get_yearly_dates(start, end)
		return jsonify({'dates':dates, 'discharge':list(dis), 'precip':list(pre)})
	return jsonify(success=False)


@main.route('/calculate_wpi_single', methods=['POST'])
def calculate_wpi_single():
	wpi_data = request.form
	wpi_index, wpi_class = calculate_wpi(wpi_data)
	wpi = {"wpi": wpi_index, "wpi_class": wpi_class}
	print(wpi,wpi_class)
	return json.dumps(wpi)

@main.route('/get_wpi_csv', methods=['GET'])
def calculate_wpi_csv():
	if request.method == 'GET':
		wpivalues, time = wpiclass.calculate_wpi()
		return jsonify({'dates':time, 'wpi' : list(wpivalues)})
	return jsonify(success = False)



@main.route('/send_wpi_xlxs', methods = ['POST'])
def send_xlxs_data():
	if request.method == 'POST':
		xlxs = request.files['file']
		xlxs_filename = secure_filename(xlxs.filename)
		xlxs.save(xlxs_filename)	
		wpiclass.set_xlxs(xlxs_filename)
		return jsonify(success=True)
	return jsonify(success=False)



@main.route('/send_wpi_ods', methods = ['POST'])
def send_ods_data():
	if request.method == 'POST':
		ods = request.files['file']
		ods_filename = secure_filename(ods.filename)
		ods.save(ods_filename)
		wpiclass.set_ods(ods_filename)
		return jsonify(success=True)
	return jsonify(success=False)