# Parkinglot Detector for Self-Driving Cars


## Run the Program

In the project directory, you can run:

```
  npm start
```

Runs the app in the development mode.\


Next is, to install the http-server, if you have installed the http-server, skip this step. 
```
  npm install http-server -g
```
After that is to go to the folder ` tfjs` and run the command below:

``` 
  http-server -c1 --cors .
```
Finally, it to refresh the [http://localhost:3000](http://localhost:3000).

## The Video
Download the [video](https://drive.google.com/file/d/1rOHgSHtArA_He6b1lBayTM_XjpmtkGfS/view?usp=sharing) and use it to text the program.

**_NOTE: The video is from the training set. This is to test the web app first._**

## The Limitation
1. Still need to improve the AI.
2. When uploading, some aspect ratio don't work.
3. The video load first than the detections.
