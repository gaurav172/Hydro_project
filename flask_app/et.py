import cmf
from datetime import datetime, timedelta
from matplotlib import pylab
from pylab import plot, twinx, ylabel, xlabel
import pandas as pd
# Create project with 1 cell and 1 water storage of 1000mm capacity
class ET:

    def __init__(self):
        pass

    def get_et(self, Tmin, Tmax, rH, wind, sunshine, Rs):
        p = cmf.project()
        cell = p.NewCell(0, 0, 0, 1000)
        layer = cell.add_layer(1.0)
        # Set summertime, when the living is easy... (1)
        summer = cmf.Weather(Tmin=Tmin, Tmax=Tmax, rH=rH, wind=wind,
                            sunshine=sunshine, daylength=14, Rs=Rs)
        cell.set_weather(summer)
        # Initial condition (4)
        layer.volume = 400.0
        # ET-Method (3)
        et_pot_turc = cmf.TurcET(layer, cell.transpiration)
        # Stress conditions (5, 6)
        stress = cmf.VolumeStress(300, 100)
        cell.set_uptakestress(stress)
        # A solver, any is fine, really
        solver = cmf.HeunIntegrator(p)
        solver.t = datetime(2018, 5, 1)
        et_act = cmf.timeseries(solver.t, cmf.day)
        volume = cmf.timeseries(solver.t, cmf.day)
        while solver.t < datetime(2018, 10, 1):
            et_act.add(cell.transpiration(solver.t))
            volume.add(layer.volume)
            solver(cmf.day)
        beg = str(et_act.begin)
        begged = beg.split('.')
        begged[0], begged[1] = begged[1], begged[0]
        last = str(et_act.end)
        lastged = last.split('.')
        lastged[0], lastged[1] = lastged[1], lastged[0]
        Period = pd.date_range(start=".".join(begged), end=".".join(lastged), freq='D')
        return list(et_act), list(volume), Period.strftime('%D').tolist()[:-1]

if __name__ == "__main__":
    et = ET()
    et_act, volume, times = et.get_et()
    print(len(et_act), len(volume), len(times))
