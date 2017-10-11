

module.exports = function (req, res, ok){

	var sessionUserMatchesdId= req.session.User.id === req.param('id');
	var isAdmin = req.session.User.admin;

	if (!(sessionUserMatchesdId || isAdmin) ){
		var noRightsError =[{name:'noRightsError', message:'No tienes permiso de administrador'}]
		req.session.flash = {
			err: noRightsError
		}
		res.redirect('/anuncios');
		return;
	}
	ok();

};
