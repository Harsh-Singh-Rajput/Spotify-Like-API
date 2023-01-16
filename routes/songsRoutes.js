import { Songs } from "../models/Models.js";
import { Op } from "sequelize";
import { authenticateToken } from "../middleware/authenticate.js";
import express from "express";
const router = express.Router();
import { nanoid } from "nanoid";

router.get("/songs", authenticateToken, async (req, res) => {
    let id = req.user.id
    // console.log();
    const songs = fetch(
    `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${process.env.API_KEY}&format=json`
  ).then(async (res) => {
        let data = await res.json();
        let json = data.tracks.track;
        let arr = []

        for (let obj of json) {
            const { name, url, artist } = obj;
            const song = {
                id: nanoid(),
                songName: name.toLowerCase(),
                songURL: url,
                artistName:artist.name,
                userId:id
            };
            arr.push(song);
        }
        console.log(arr);
        return arr
    });
    await Songs.bulkCreate(await songs)
    res.status(200).send({ message: "success", songs: await songs });
})

router.get("/songs/:id", authenticateToken, async (req, res) => {
const song = await Songs.findOne({
    where: {
    id: req.params.id,
    },
});
if(song != null){

    return res.status(200).send({ message: "success", song: song });
}
    return res.status(404).send({error:`song with id:${req.params.id} not found`})
});

// router.get("/api/songs/search", authenticateToken, async (req, res) =>{
//     let artist = req.query.artist;
//     let track = req.query.track;
//     const song = fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.API_KEY}&artist=${artist}&track=${track}&format=json`).then(async (res) =>{
//     })
//     res.status(200).send({message:"success", song:song.dataValues})
// })


export default router;
