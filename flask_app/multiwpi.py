
import pandas as pd
import re
import numpy as np
import math
import matplotlib.pyplot as plt
import io
import base64
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
from sklearn.metrics import r2_score, explained_variance_score, mean_squared_error, mean_absolute_error
import pandas
import pandas as pd
from sklearn.model_selection import GridSearchCV
import math
import numpy as np
import seaborn as sns
from sklearn.model_selection import train_test_split
import scipy.stats as sp
from sklearn import preprocessing
from math import sqrt
from numpy import concatenate
from matplotlib import pyplot
from pandas import read_csv
from pandas import DataFrame
from pandas import concat
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_squared_error
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import LSTM
from keras.layers import Activation, Dropout
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler


class WPI:

    def __init__(self):
        self.start = "true"

    def set_xlxs(self, df):
        self.xlxs = df

    def set_ods(self, df):
        self.ods = df
        
    def calculate_wpi(self):

        data = pd.read_excel(self.xlxs)

        unwanted = ['Sl. No', 'STATION', 'RIVER', 'BASIN PATH', 'POSITION', 'FREQUENCY',
            'LOCATION',  'UNITS']
        
        data = data.drop(unwanted, axis=1)
        data = data.drop([0,1,2], axis=0)
        
        cols_with_missing = [col for col in data.columns
                            if data[col].isnull().any()]
        
        final_data = data.drop([3,4,5,6,7,8,9,13,16,21,22,24,25,27,28,29,30,33,34,36], axis=0)

        data_f = final_data.T
        data_f = data_f[1:]

        time = []
        time = final_data.columns[1:]
        time.to_list()
        time = list(time)

        data_np = final_data.to_numpy()
        
        do_converter = pd.read_excel(self.ods,engine="odf")

        do_convert_dict = {}

        converter = do_converter.to_numpy()


        r,s = converter.shape


        for i in range(r):
            do_convert_dict[converter[i][0]] = converter[i][1]


        transpose = data.T
        temp = transpose[9]
        do_list = transpose[11]

        temp = temp.values
        temp = temp[1:]

        do_list = do_list.values
        do_list = do_list[1:]

        do_per = []

        for t in range(len(temp)):
            tmp = float(temp[t][:-2])
            solubility = do_convert_dict[tmp]
            do_per.append((float(do_list[t])/solubility)*100)


        do_old = data_np[1]
        do_per.insert(0,do_old[0])
        data_np[1] = do_per

        def turbidity(y):
            if(y<=5):
                return 1
            elif(y>5 and y<=10):
                return y/5
            elif(y>10 and y<=500):
                return ((y+43.9)/34.5)
            else:
                assert (y > 500),"Invalid range!"

        def COD(y):
            return 0.10*y

        def TSS(y):
            if(y==10):
                return
            else:
                a1 = abs(y-10)
                a = math.log10(a1)
                b = math.log10(10)
                c = 2.1*(a-b)
                return pow(2,c)

        def ammonia(y):
            return pow(2,(2.1*(math.log10(10*y))))

        def pH(y):
            if(y==7):
                return 1
            elif(y>7):
                return math.exp((y-7.0)/1.082)
            elif(y<7):
                return math.exp((7.0-y)/1.082)
            else:
                assert(),"Invalid range"

        def color(y):
            if(y>=10 and y<=150):
                return ((y+130)/140)
            elif(y>150 and y<1200):
                return y/75
            else:
                assert(y<10 or y>1200),"Invalid range"

        def do(y):
            if(y<50):
                return math.exp(-(y-98.33)/36.067)
            elif(y>=50 and y<=100):
                return ((107.58-y)/14.667)
            elif(y>100):
                return ((y-79.543)/19.054)

        def bod(y):
            if(y<2):
                return 1
            elif(y>=2 and y<=30):
                return y/1.5
            else:
                assert (y>30),"Invalid range!"

        def tds(y):
            if(y<=500 and y>=0):
                return 1
            elif(y>500 and y<=1500):
                return math.exp((y-500)/721.5)
            elif(y>1500 and y<=3000):
                return ((y-1000)/125)
            elif(y>3000 and y<=6000):
                return y/375
            else:
                assert(y>6000 or y<0),"Invalid range!"

        def hardness(y):
            if(y<=75 and y>=0):
                return 1
            elif(y>75 and y<500):
                return math.exp((y+42.5)/205.58)
            elif(y>=500):
                return(y+500)/125

        def chloride(y):
            if(y<=150 and y>0):
                return 1
            elif(y>150 and y<=250):
                return math.exp(((y/50)-3)/1.4427)
            elif(y>250):
                return math.exp(((y/50)+10.167)/10.82)
            else:
                assert(y<0),"Invalid range"

        def nitrate(y):
            if(y<=20 and y>0):
                return 1
            elif(y>20 and y<=50):
                return math.exp((y-145.16)/76.28)
            elif(y>50 and y<=200):
                return y/65
            else:
                assert(y<0 or y>200),"INvalid range"

        def sulphate(y):
            if(y>0 and y<=150):
                return 1
            elif(y>150 and y<=2000):
                return (((y/50)+0.375)/2.5121)
            else:
                assert(y<0 or y>2000),"INvalid range"

        def coli(y):
            if(y<=50 and y>0):
                return 1
            elif(y>50 and y <=5000):
                return (y/50)**0.3010
            elif(y>5000 and y<=15000):
                return ((y/50)-50)/16.071
            elif(y>15000):
                return (y/15000)+16
            else:
                assert(y<0),"Invalid range"

        def flouride(y):
            if(y>=0 and y<=1.2):
                return 1
            elif(y>1.2 and y<10):
                return (((y/1.2)-0.3819)/0.5083)
            else:
                assert(y>=10),"Invalid range"

        df = pd.DataFrame(data_np)
        metrics = df[0].values

        pollutionIndexDict = {m:[] for m in metrics}

        ph_val = []
        bod_val = []
        cl_val = []
        do_val = []
        f_val = []
        hardness_val = []
        n_val = []
        so4_val = []
        total_coli_val = []
        tds_val = []
        turb_val = []
        ammonia_val = []
        TSS_val = []
        cod_val = []

        def calculateOverallPollutionIndex(data):
            total_count=0
            pollutionIndex=0
            for i in range(0,len(data)):
                
                try:
                    if(data[i]!='ND'):
                        val=float(data[i])
                except:
                    val=data[i]
                    val=re.sub('[^0-9]+', '', val)
                    a=val
                    val=float(a)

                if(i==0):
                    if(math.isnan(val)):
                        pollutionIndexDict["pH"].append(-1)
                        continue
                    res=pH(val)
                    pollutionIndexDict[metrics[0]].append(res)
                    ph_val.append(val)
                    total_count+=1
                    pollutionIndex+=res
                elif(i==1):
                    if(math.isnan(val)):
                        pollutionIndexDict[metrics[1]].append(-1)
                        continue
                    res=do(val)
                    pollutionIndexDict[metrics[1]].append(res)
                    do_val.append(val)
                    total_count+=1
                    pollutionIndex+=res
                elif(i==2):
                    if(math.isnan(val)):
                        pollutionIndexDict[metrics[2]].append(-1)
                        continue
                    res=bod(val)
                    
                    if res is None:
                        pollutionIndex+=0

                    else:
                        total_count+=1
                        bod_val.append(val)
                        pollutionIndexDict[metrics[2]].append(res)
                        pollutionIndex+=res
                elif(i==3):
                    if(math.isnan(val)):
                        pollutionIndexDict[metrics[3]].append(-1)
                        continue
                    res=nitrate(val)
                    n_val.append(val)
                    pollutionIndexDict[metrics[3]].append(res)
                    total_count+=1
                    pollutionIndex+=res
                elif(i==4):
                    if(math.isnan(val)):
                        pollutionIndexDict[metrics[4]].append(-1)
                        continue
                    elif(data[i]=='ND'):
                        pollutionIndexDict[metrics[4]].append(-1)
                        continue
                    res=ammonia(val)
                    ammonia_val.append(val)
                    pollutionIndexDict[metrics[4]].append(res)
                    total_count+=1
                    pollutionIndex+=res
                elif(i==5):
                    if(math.isnan(val)):
                        pollutionIndexDict[metrics[5]].append(-1)
                        continue
                    res=coli(val)
                    total_coli_val.append(val)
                    pollutionIndexDict[metrics[5]].append(res)
                    total_count+=1
                    pollutionIndex+=res
                elif(i==6):
                    if(math.isnan(val)):
                        pollutionIndexDict[metrics[6]].append(-1)
                        continue
                    res=COD(val)
                    cod_val.append(val)
                    pollutionIndexDict[metrics[6]].append(res)
                    total_count+=1
                    pollutionIndex+=res

                elif(i==7):
                    if(math.isnan(val)):
                            pollutionIndexDict[metrics[7]].append(-1)
                            continue
                    res=turbidity(val)
                    turb_val.append(val)
                    pollutionIndexDict[metrics[7]].append(res)
                    total_count+=1
                    pollutionIndex+=res
                elif(i==8):
                    if(math.isnan(val)):
                        pollutionIndexDict[metrics[8]].append(-1)
                        continue
                    res=hardness(val)
                    hardness_val.append(val)
                    pollutionIndexDict[metrics[8]].append(res)
                    total_count+=1
                    pollutionIndex+=res
                elif(i==9):
                    
                    if(math.isnan(val)):
                        pollutionIndexDict[metrics[9]].append(-1)
                        continue
                    res=chloride(val)
                    cl_val.append(val)
                    pollutionIndexDict[metrics[9]].append(res)
                    total_count+=1
                    pollutionIndex+=res
                    
                elif(i==10):
                    if(math.isnan(val)):
                        pollutionIndexDict[metrics[10]].append(-1)
                        continue
                    res=sulphate(val)
                    so4_val.append(val)
                    pollutionIndexDict[metrics[10]].append(res)
                    total_count+=1
                    pollutionIndex+=res
                elif(i==11):
                    if(math.isnan(val)):
                        pollutionIndexDict[metrics[11]].append(-1)
                        continue
                    res=TSS(val)

                    if res is None:
                        pollutionIndex+=0

                    else:
                        total_count+=1
                        TSS_val.append(val)
                        pollutionIndexDict[metrics[11]].append(res)
                        pollutionIndex+=res

                elif(i==12):
                    if(math.isnan(val)):
                        pollutionIndexDict[metrics[12]].append(-1)
                        continue
                    res=tds(val)
                    tds_val.append(val)
                    pollutionIndexDict[metrics[12]].append(res)
                    total_count+=1
                    pollutionIndex+=res
                elif(i==13):
                    if(math.isnan(val)):
                        pollutionIndexDict[metrics[13]].append(-1)
                        continue
                    res=flouride(val)
                    f_val.append(val)
                    pollutionIndexDict[metrics[13]].append(res)
                    total_count+=1
                    pollutionIndex+=res
            return pollutionIndex/total_count

        df = df.T

        data = df[1:]
        data = data.to_numpy()
        r, c = data.shape

        pollutionIndexPerMonth = []
        for i in range(0,r):
            pollutionIndexPerMonth.append(calculateOverallPollutionIndex(data[i]))

        # fig = Figure(figsize=(30,10))
        # axis = fig.add_subplot(1, 1, 1)
        # axis.set_xlabel("x-axis")
        # axis.set_ylabel("Pollution index")
        # axis.grid()
        
        # axis.plot(time, pollutionIndexPerMonth, "ro-")
        

        # threshold = 4
        # y = np.array(pollutionIndexPerMonth)
        # below_threshold = np.logical_and(y < threshold , y> 2)
        # accepatable_threshold = 2
        
        # acceptable = np.logical_and(y>accepatable_threshold,y<threshold)
        

        # excellent = y<accepatable_threshold
        
        # x = np.array(time)

        # axis.scatter(x[acceptable], y[acceptable], color='yellow') 
        # axis.scatter(x[excellent], y[excellent], color='green') 

        # above_threshold = y>4
        # axis.scatter(x[above_threshold], y[above_threshold], color='red') 
    
        # # Convert plot to PNG image
        # pngImage = io.BytesIO()
        # FigureCanvas(fig).print_png(pngImage)
        
        # # Encode PNG image to base64 string
        # pngImageB64String = "data:image/png;base64,"
        # pngImageB64String += base64.b64encode(pngImage.getvalue()).decode('utf8')

        PollutionPeriod = pd.date_range(start='1/4/2006', periods=132, freq='M')
        PollutionDataset = pd.DataFrame(index = PollutionPeriod, data=pollutionIndexPerMonth)
        PollutionDataset.rename(columns = {0:'Index'}, inplace = True)
        
        PollutionDataset.to_csv("PollutionIndexDataSet.csv")
        
        #linImage, barImage = self.get_predictions_plot("PollutionIndexDataSet.csv")
        return pollutionIndexPerMonth, time
        #return pngImageB64String, linImage, barImage

    def get_predictions_plot(self):

        csv_file = pd.read_csv("PollutionIndexDataSet.csv")

        # convert an array of values into a dataset matrix
        def create_dataset(dataset, look_back=1):
            dataX, dataY = [], []
            for i in range(len(dataset)-look_back-1):
                a = dataset[i:(i+look_back), 0]
                dataX.append(a)
                dataY.append(dataset[i + look_back, 0])
            return np.array(dataX), np.array(dataY)

        def Scores(y_test, y_pred):
            r2score = r2_score(y_test, y_pred) 
            msescore = mean_squared_error(y_test, y_pred) 
            rmsescore = np.sqrt(msescore)
            rsrscore = rmsescore/np.std(y_test)     
            nsescore = 1 - (np.sum((y_pred-y_test)**2)/np.sum((y_test-np.mean(y_test))**2))
            maescore = mean_absolute_error(y_test, y_pred)      
            return ('r2score: ', r2score ,'msescore: ', msescore, 'rmsescore: ', rmsescore , 'rsrscore: ', rsrscore,'nsescore: ', nsescore, 'maescore: ', maescore)

        dataset = pd.read_csv(csv_file,header=None, index_col=0, parse_dates=True, squeeze=True)
        dataset.index = dataset.index.strftime('%Y-%m-%d')
        dataset = dataset.loc['2006-01-31': '2016-12-31']

        scaler = MinMaxScaler(feature_range=(0, 1))
        dataset = scaler.fit_transform(dataset.values.reshape(-1, 1))

        # split into train and test sets
        train_size = int(len(dataset) * 0.80)
        test_size = len(dataset) - train_size
        train, test = dataset[0:train_size,:], dataset[train_size:len(dataset),:]

        # reshape into X=t and Y=t+1
        look_back = 1
        trainX, trainY = create_dataset(train, look_back)
        testX, testY = create_dataset(test, look_back)

        # reshape input to be [samples, time steps, features]
        trainX = np.reshape(trainX, (trainX.shape[0], 1, trainX.shape[1]))
        testX = np.reshape(testX, (testX.shape[0], 1, testX.shape[1]))

        # create and fit the LSTM network
        model = Sequential()
        model.add(LSTM(4, input_shape=(1, look_back)))
        model.add(Dense(1))
        model.compile(loss='mean_squared_error', optimizer='adam')
        model.fit(trainX, trainY, epochs=50, batch_size=1, verbose=2)

        # make predictions
        trainPredict = model.predict(trainX)
        testPredict = model.predict(testX)
        # invert predictions
        trainPredict = scaler.inverse_transform(trainPredict)
        trainY = scaler.inverse_transform([trainY])
        testPredict = scaler.inverse_transform(testPredict)
        testY = scaler.inverse_transform([testY])
        # calculate scores
        # shift train predictions for plotting

        fig = Figure(figsize=(18,6))
        ax = fig.add_subplot(1, 1, 1)
        trainPredictPlot = np.empty_like(dataset)
        trainPredictPlot[:, :] = np.nan
        trainPredictPlot[look_back:len(trainPredict)+look_back, :] = trainPredict
        # shift test predictions for plotting
        testPredictPlot = np.empty_like(dataset)
        testPredictPlot[:, :] = np.nan
        testPredictPlot[len(trainPredict)+(look_back*2)+1:len(dataset)-1, :] = testPredict
        # plot baseline and predictions
        ax.plot(scaler.inverse_transform(dataset),label='Observed data',lw=1.5,color='#1F77B4')
        ax.plot(trainPredictPlot,label='Training',lw=0.5,c='red')
        ax.plot(testPredictPlot,label='Testing',lw=0.5,c='green')
        #plt.setp(ax.get_xticklabels(), fontsize=14)
        #plt.setp(ax.get_yticklabels(), fontsize=14) 
        ax.legend(loc='upper right',fontsize=14)
        ax.set_ylabel('Water Pollution Index', fontsize=14)
        ax.set_xlabel('Time', fontsize=14)
        ax.legend(loc='best')

       # Convert plot to PNG image
        pngImage = io.BytesIO()
        FigureCanvas(fig).print_png(pngImage)
        
        # Encode PNG image to base64 string
        pngImageB64String = "data:image/png;base64,"
        pngImageB64String += base64.b64encode(pngImage.getvalue()).decode('utf8')

        #bar graph creation
        predicted_data = np.append(trainPredictPlot, testPredictPlot)
        bins = [0,10,20,30,40,50,60,70,80,90]
        fig_bar = Figure(figsize=(18,6))
    
        ax_bar_1 = fig_bar.add_subplot(1, 2, 1)
        ax_bar_1.hist(scaler.inverse_transform(dataset), bins, histtype = 'bar', label = 'Observed Data', rwidth = 0.8)
        ax_bar_1.legend(loc = 'upper right', fontsize = 14)
        ax_bar_1.set_xlabel('Water Pollution Index', fontsize=14)
        ax_bar_1.set_ylabel('No. of observations', fontsize=14)

        ax_bar_2 = fig_bar.add_subplot(1, 2, 2)
        ax_bar_2.hist(predicted_data, bins, histtype = 'bar', label = 'Predicted Data', rwidth = 0.8)
        ax_bar_2.legend(loc = 'upper right', fontsize = 14)
        ax_bar_2.set_xlabel('Water Pollution Index', fontsize=14)
        ax_bar_2.set_ylabel('No. of observations', fontsize=14)


        barPngImage = io.BytesIO()
        FigureCanvas(fig_bar).print_png(barPngImage)

        barPngImageB64String = "data:image/png;base64,"
        barPngImageB64String += base64.b64encode(barPngImage.getvalue()).decode('utf8')
                           
        return pngImageB64String, barPngImageB64String

