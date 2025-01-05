from flask import Blueprint, render_template, jsonify, send_from_directory
import os

views = Blueprint(__name__, "views")

@views.route("/")
def home():
    return render_template("doe_card_visualiser.html")

@views.route("/dragon-of-eden-builder")
def doe_builder():
    return render_template("doe_card_visualiser.html")

# Route to serve static files
@views.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory("static", filename)

# Route to list files in a folder
@views.route("/list-files/<path:folder>")
def list_files(folder):
    directory = os.path.join("static", folder)
    try:
        # Get all files in the folder
        files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
        return jsonify(files)
    except FileNotFoundError:
        return jsonify([]), 404
