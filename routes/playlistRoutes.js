import express from "express";
import {Op} from "sequelize"
import { nanoid } from "nanoid";
import {Playlist, Songs, User} from "../models/Models.js";
import { authenticateToken } from "../middleware/authenticate.js";
const router = express.Router();

router.post("/playlists", authenticateToken, async(req, res) => {
    const {name, description} = req.body
    let id = req.user.id
    if(!name || !description) {
      return res.status(400).send("Playlist Name or Playlist Description cannot be empty");
    }
    const playlist = {
      name,
      description,
      userId: id,
      id:nanoid()
    }
    console.log(playlist);
    const createdPlaylist = await Playlist.create(playlist)
    res.status(201).send({message:"Playlist created successfully", createdPlaylist})
  })
  
  router.get("/playlists", authenticateToken, async(req, res) =>{
    const playlists = await Playlist.findAll({
      where: {
        userId:req.user.id
      }
    })
    if(playlists.length > 0){
      return res.status(200).send(playlists)
    }
    return res.status(404).send({message:"No Playlist is created"})
  })
  
  router.get("/playlists/:id",authenticateToken, async (req, res) =>{
    const playlist = await Playlist.findOne({
      where:{
        [Op.and]: [{ id:req.params.id }, { userId:req.user.id }]
      }
    })
    if(playlist != null){
      return res.status(200).send({message:"success", playlist})
    }
    return res.status(404).send({error:`Playlist with id:${req.params.id} not found`})
  })
  
  router.put("/playlists/:id", authenticateToken, async(req, res) => {
    const {name, description} = req.body
    if(!name || !description) {
      return res.status(400).send("Playlist Name or Playlist Description cannot be empty");
    }
    const updatePlaylist = {
      name,
      description
    }
    const updatedPlaylist = await Playlist.update(updatePlaylist, {
      where:{
        [Op.and]: [{ id:req.params.id }, { userId:req.user.id }]
      }
    })
    return res.status(200).send({message:"Playlist updated successfully", updatedPlaylist})
  })
  
  router.delete("/playlists/:id", authenticateToken, async(req, res) => {
    let deletedPlaylist = await Playlist.destroy({
      where:{
        [Op.and]: [{ id:req.params.id }, { userId:req.user.id }]
      }
    })
    return res.status(200).send({message:"Playlist deleted successfully"})
  })
 
  
  router.post("/playlists/:id/songs", authenticateToken, async(req, res) => {
    const songId = req.body.song_id
    console.log(songId);
    let isSongExist = await Songs.findOne({
      where:{
        [Op.and]: [{ id:songId }, { userId:req.user.id }]
      }
    })
    if(isSongExist == null){
      return res.status(404).send({error:`song with id:${songId} doesn't exist`})
    }
    let {name, description} = await Playlist.findOne({
      where:{
        [Op.and]: [{ id:req.params.id }, { userId:req.user.id }]
      }
    })
    

    let playlist = {
      name,
      description,
      songId,
      userId:req.user.id,
      id:req.params.id
    }
    const updatedPlaylist = await Playlist.create(playlist)
    return res.status(200).send({message:"Song added successfully", updatedPlaylist})
    

    
  })
  
 router.delete("/playlists/:id/songs", authenticateToken, async(req, res) => {
  let songId = req.body.song_id 
  if(!songId){
    return res.status(400).send({error:"invalid song id"})
  }
    let deletedPlaylist = await Playlist.destroy({
      where:{
        [Op.and]: [{ id:req.params.id }, { songId}]
      }
    })
    return res.status(200).send({message:"Song deleted successfully"})
  })
  export default router;