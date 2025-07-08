console.log("JS is loading!");
const APP_ID = "f2e52d0df39a4bc1bf5f25f730843711";
const TOKEN = "007eJxTYJjhmxJ6m+dF8tTa9duFNZR78qfdN1Tdaxi+NSf03dr66lAFhjSjVFOjFIOUNGPLRJOkZMOkNNM0I9M0c2MDCxNjc0NDjpTcjIZARob2GyyMjAwQCOJzMKSk5uYH5efnMjAAAIwMH6Q="; // Use null for testing
const CHANNEL = "demoRoom";

let client;
let localTrack;

document.getElementById("joinBtn").onclick = async () => {
  client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  client.on("user-published", async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === "video") {
      user.videoTrack.play("remote");
    }
    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  });

  await client.join(APP_ID, CHANNEL, TOKEN, null);

  localTrack = await AgoraRTC.createCameraVideoTrack();
  localTrack.play("local");

  await client.publish([localTrack]);

  console.log("Joined Agora channel successfully!");
};
