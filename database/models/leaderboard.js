const mongoose 	= require('mongoose')

module.exports = (connection) => {
  let Leaderboard = new mongoose.Schema({
    user_id: 		  { type: Number, required: true  },
    username: 		{ type: String, required: true  },
    points: 			{ type: Number , required: true  },
    level: 	      { type: Number , required: true  }
  })

	Leaderboard.statics.addMember = function(data){
		const _this = this

    _this.create({
      rank:     data.rank,
      username: data.username,
      points:   0,
      level:    0
    })
	}

  return connection.model('leaderboard', Leaderboard);
}