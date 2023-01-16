import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class User extends Model {} ;
class Tokens extends Model {} ;
class Playlist extends Model {} ;
class Songs extends Model {} ;

User.init(
    {
        name:{
            type: DataTypes.STRING,
            required: true
        },
        email:{
            type: DataTypes.STRING,
            required: true
        },
        password:{
            type: DataTypes.STRING,
            required: true
        },
    },
    {
        sequelize, modelName:"user",
        
        
    },
    
)

Tokens.init(
    {
        token:{
            type: DataTypes.STRING,
            required: true
        },
        
    },
    {
        sequelize, modelName:"token"
    }
    )

    Playlist.init(
        {   
            uid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true // Automatically gets converted to SERIAL for postgres
              },
            id: {
                type: DataTypes.STRING,
              },
            name:{
                type: DataTypes.STRING,
                required: true
            },
            description:{
                type: DataTypes.STRING
            },
            songId:{
                type: DataTypes.STRING
            },
            
            
        },
        {
            sequelize, modelName:"playlist"
        },
    )

    Songs.init(
        {   
            id:{
                type: DataTypes.STRING,
                required: true,
                primaryKey:true,
            },
            songName:{
                type: DataTypes.STRING,
                required: true
            },
            songURL:{
                type: DataTypes.STRING
            },
            artistName:{
                type: DataTypes.STRING
            },
            
            
        },
        {
            sequelize, modelName:"songs"
        },
    )
        
    User.hasMany(Playlist)
    User.hasMany(Songs)

export {User, Tokens, Playlist, Songs}