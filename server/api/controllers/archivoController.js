/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const path = require('path');
module.exports = {
	index: function (req,res){

		res.writeHead(200, {'content-type': 'text/html'});
		res.end(
		'<form action="/archivo/upload" enctype="multipart/form-data" method="post">'+
		'<input type="file" name="avatar" accept=".png, .jpg, .jpeg"><br>'+
		'<input type="submit" value="Upload">'+
		'</form>'
		)
	},
	upload: function  (req, res) {
		if(req.method === 'GET')
			return res.json({'status':'GET not allowed'});
		sails.log.debug('We have entered the uploading process ');
	  req.file('avatar').upload({
	  	dirname: '../../assets/images/avatars/'
		},function (err, uploadedFiles) {
			//console.log(uploadedFiles);
		  if (err) return res.negotiate(err);
			var obj={
				name: path.posix.basename(uploadedFiles[0].fd),
				owner: req.session.User.id,
				tipo: uploadedFiles[0].type,
				size: uploadedFiles[0].size
			}
			archivo.create(obj,function(err, image){
				if (err){
					console.log(err);
				}
				else{

					User.update({id:image.owner},{user_image:image.name},function editImage(err, user){
							if(err){
							}
							User.publishUpdate(req.session.User.id, user)
					})
				}
			});
		  //return res.json({
		    //message: uploadedFiles.length + ' file(s) uploaded successfully!'
		  //});
		});
		res.redirect('/perfil');
	}
};
