 //https://teachablemachine.withgoogle.com/models/DM5XKuAWD/

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:95
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML="<img id='captured_img' src='"+data_uri+"'>";

    });


}

console.log("ml5 version:",ml5.version);

prediction_1="";
prediction_2="";

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/zl8E2amGI/',modelLoaded);

function modelLoaded(){
    console.log("Model loaded :)")

}

function speak(){
    var synth=window.speechSynthesis;
    speech1="Prediction one is:"+prediction_1;
    speech2="Prediction two is:"+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speech1 + speech2);
    synth.speak(utterthis);
    

}

function check(){
    img=document.getElementById("captured_img");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if (error){
        console.error(error);
    
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

        if (prediction_1=="Fist Bump"){
            document.getElementById("update_emoji").innerHTML="&#9994;";
        }

        if (prediction_1=="Waving Hand"){
            document.getElementById("update_emoji").innerHTML="&#9995;";
    
        }

        if (prediction_1=="Peace"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
    
        }

        if (prediction_2=="Fist Bump"){
            document.getElementById("update_emoji2").innerHTML="&#9994;";
        }

        if (prediction_2=="Waving Hand"){
            document.getElementById("update_emoji2").innerHTML="&#9995;";
    
        }

        if (prediction_2=="Peace"){
            document.getElementById("update_emoji2").innerHTML="&#9996;";
    
        }


    }
}