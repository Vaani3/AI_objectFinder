video="";
status1= false;

function preload(){
    video = createVideo(VIDEO);
    video.hide();

}

function setup(){
 canvas=createCanvas(380,280);
 canvas.center();
}

function draw(){
    console.log("inside function draw");
    image(VIDEO,0,0,380,280);
    if(status1!=""){
        objectDetector.detect(video,gotResult);
        for(i=0;  i < objects.length;i++){
            document.getElementById("status").innerHTML = "status = objects detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are :" +object.length;
            
            fill("FF0000");
            percent= floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects" ;
}

function modelLoaded(){
    console.log("Model Loaded!!")
    status1=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error,results){
  if(error){
    console.log(error);
  }
  console.log(results);
  objects=results;
}