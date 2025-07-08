console.log("app.js loaded!");

const APP_ID = "f2e52d0df39a4bc1bf5f25f730843711";
const TOKEN = "007eJxTYLi11VZ1Rt0iY2XBS01Ll1hWiWS+D3PpM433ni/WVr5f4JgCQ5pRqqlRikFKmrFloklSsmFSmmmakWmaubGBhYmxuaGhUE5uRkMgI0NHXxADIxSC+BwMLqm5+UH5+bkMDABBPR6j";
const CHANNEL = "DemoRoom";

let client;
let localTrack;

document.getElementById("joinBtn").onclick = async () => {
  console.log("Join button clicked");

  try {
    client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    client.on("user-published", async (user, mediaType) => {
      console.log("User published:", user.uid, mediaType);

      await client.subscribe(user, mediaType);

      if (mediaType === "video") {
        user.videoTrack.play("remote");
        console.log("Playing remote video");
      }
      if (mediaType === "audio") {
        user.audioTrack.play();
        console.log("Playing remote audio");
      }
    });

    await client.join(APP_ID, CHANNEL, TOKEN, null);
    console.log("Joined channel successfully");

    localTrack = await AgoraRTC.createCameraVideoTrack();
    localTrack.play("local");
    console.log("Local video started");

    await client.publish([localTrack]);
    console.log("Published local track");
  } catch (e) {
    console.error("Error in Agora setup:", e);
    alert("Error: " + e.message);
  }
};
