/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const path = require('path');
module.exports = {

	upload: function  (req, res) {

			var user = req.user;
			if(req.method === 'GET')
				return res.json({'status':'GET not allowed'});
			sails.log.debug('Subiendo Imagen ...');
		  req.file('avatar').upload({ dirname: '../../assets/images/avatars/'},function (err, uploadedFiles) {

				  if (err) return res.negotiate(err);
					var obj={
						name: path.posix.basename(uploadedFiles[0].fd),
						owner: user.id,
						tipo: uploadedFiles[0].type,
						size: uploadedFiles[0].size
					}
					archivo.create(obj,function(err, image){
						if (err){
							return res.json({
								code: 'FAIL',
								message: 'OCURRIO UN PROBLEMA AL SUBIR LA IMAGEN'
							});
						}
						User.update({id:user.id},{user_image:image.name},function editImage(err, user){
								if(err){
									return res.json({
										code: 'FAIL',
										message: 'OCURRIO UN PROBLEMA AL SUBIR LA IMAGEN'
									});
								}
								console.log(uploadedFiles.length, ' file(s) uploaded successfully!');
								return res.json({
									code:'SUCCESS',
									user: user
								});
						})
					});
			});
	}

};
