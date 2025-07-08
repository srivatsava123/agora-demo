const APP_ID = "f2e52d0df39a4bc1bf5f25f730843711";
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

  // 🔥 Fetch token from backend
  const res = await fetch(`http://localhost:3000/get-token?channel=${CHANNEL}`);
  const data = await res.json();
  const TOKEN = data.token;

  await client.join(APP_ID, CHANNEL, TOKEN, null);

  localTrack = await AgoraRTC.createCameraVideoTrack();
  localTrack.play("local");

  await client.publish([localTrack]);

  console.log("Joined Agora channel successfully!");
};

document.getElementById("leaveBtn").onclick = async () => {
  if (localTrack) {
    localTrack.stop();
    localTrack.close();
  }
  await client.leave();
  console.log("Left Agora channel.");
};
