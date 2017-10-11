this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/addAnuncioCreate.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<section data-id="' +
((__t = ( anuncio.id )) == null ? '' : __t) +
'" data-model="anuncio" class="col-lg-8 card" id="anuncios-card">\n    <div class="Anuncio">\n      <div class="row start-lg">\n        <div class="Anuncio-Image col-lg-1"><img id="User-anuncios-img" src="/images/avatars/default_user.png"></div>\n        <div class="Anuncio-Info col-lg-10">\n          <div class="box">\n            <div class="row start-lg">\n              <div class="col-lg-12">\n                <h5 class="Anuncio-User">' +
((__t = ( anuncio.autor.name )) == null ? '' : __t) +
'</h5>\n              </div>\n              <div class="col-lg-12">\n                <h6 class="Anuncio-Time">' +
((__t = ( anuncio.fecha )) == null ? '' : __t) +
'</h6>\n              </div>\n              <div class="col-lg-12">\n                <p class="Anuncio-Text">' +
((__t = ( anuncio.text )) == null ? '' : __t) +
'</p>\n              </div>\n            </div>\n          </div>\n        </div>\n\n      ';
 _.each(anuncio.comment,function(comment) { ;
__p += '\n        <div class="divider col-lg-12"> </div>\n        <div class="Comentario col-lg-10">\n          <div class="row start-lg">\n            <div class="Comentario-Image col-lg-1"><img id="User-anuncios-img" src="/images/avatars/default_user.png"></div>\n            <div class="Comentario-Info col-lg-10">\n              <div class="box">\n                <div class="row start-lg">\n                  <div class="col-lg-12">\n                    <h5 class="Comentario-User">' +
((__t = ( comment.autor )) == null ? '' : __t) +
'</h5><p class="Comentario-Text">' +
((__t = ( comment.text )) == null ? '' : __t) +
'</p>\n                  </div>\n                  <div class="col-lg-12">\n                    <h6 class="Comentario-Time">' +
((__t = ( comment.fecha )) == null ? '' : __t) +
'</h6>\n                  </div>\n\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      ';
 }); ;
__p += '\n\n        <div class="divider col-lg-12"> </div>\n        <div class="Anuncio col-lg-12">\n          <div class="AnuncioNuevo">\n            <div class="row start-lg">\n              <div class="Anuncio-Image col-lg-1"><img id="User-anuncios-img" src="/images/avatars/default_user.png"></div>\n              <div class="AnuncioNuevo-Form col-lg-10">\n                <form action="/comentario/create/' +
((__t = ( anuncio.id )) == null ? '' : __t) +
'" class="box" method="POST" accept-charset="utf-8">\n                  <div class="row start-lg">\n                    <div class="col-lg-12">\n                      <textarea name="text" id="text" class="AnuncioNuevo-Text" placeholder="Responder anuncio..." required></textarea>\n                    </div>\n                    <div class="col-lg-12">\n                      <input type="submit" class="AnuncioNuevo-Btn btn" value="Comentar"/>\n                      <input type="hidden" name="_csrf" value="' +
((__t = (_csrf )) == null ? '' : __t) +
'"/>\n                    </div>\n                  </div>\n                </form>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n</section>\n';

}
return __p
};

this["JST"]["assets/templates/addUserCreate.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<tr data-id="' +
((__t = ( user.id )) == null ? '' : __t) +
'" data-model="user" class="Empleados-Item">\n  <th><img class="Empleado-Image" src="/images/avatars/default_user.png"></th>\n  <th>' +
((__t = ( user.name )) == null ? '' : __t) +
'</th>\n  <th>' +
((__t = ( user.email )) == null ? '' : __t) +
'</th>\n  <th>' +
((__t = ( user.phone )) == null ? '' : __t) +
'</th>\n  <th>\n    <select class="subGroups" id="subGroups" multiple="" data-link="ajax" >\n\n      <option value="">' +
((__t = ( user.id_group )) == null ? '' : __t) +
'</option>\n\n    </select>\n  </th>\n  <th class="textCenter">\n    <p>' +
((__t = ( user.tokens )) == null ? '' : __t) +
'</p>\n  </th>\n\n  <th>\n    <a class="btn-flat Empleado-Edit" href="#Empleado-Modal" value="' +
((__t = ( user.id )) == null ? '' : __t) +
'" data-link="ajax"><i class="material-icons">edit</i></a>\n    ';
 if(user.admin==false){ ;
__p += '\n    <form class="Destroy-Button" action="/user/destroy/' +
((__t = ( user.id )) == null ? '' : __t) +
'" method="POST" accept-charset="utf-8">\n      <input type="hidden" name="_method" value="Clear"/>\n      <input class="btn-flat material-icons" value="close" type="submit">\n      <input type="hidden" name="_csrf" value="' +
((__t = ( _csrf )) == null ? '' : __t) +
'"/>\n    </form>\n    ';
 } ;
__p += '\n  </th>\n</tr>\n';

}
return __p
};