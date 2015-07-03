from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, Response, jsonify
import calculate_path
import os
import pandas as pd

app = Flask(__name__)

@app.route("/")
def root():
    return render_template('index.html')


total_costs = pd.read_csv('./data/total_costs.csv', index_col=[0])
transp = pd.read_csv('./data/transp.csv', index_col=[0])

@app.route("/cities", methods=['POST'])
def cities():
    data = request.get_json()

    df_trip, dit = calculate_path.trip_costs(data['cities'], total_costs)
    calculate_path.create_ampl_dat(df_trip, dit)
    print(dit)
    os.system('ampl ./ampl/a2-1.mod ./ampl/dados.dat ./ampl/final.run')

    f = open('./ampl/output.txt', 'r')

    return jsonify({'cities': }), 200


if __name__ == "__main__":
    app.run(port=8000, debug=True)
