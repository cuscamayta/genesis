app.filter('filterStock', function ($filter) {

	return function (items, textFilter) {		
		var itemsFiltereds = $filter('filter')(items, textFilter);
		if (!itemsFiltereds) return itemsFiltereds;

		var arrayToReturn = itemsFiltereds.where(function (item) {
			return item.Stock >= 1;
		});

		return arrayToReturn;
	};
});


app.directive('validate', function () {
	return {
		link: function (scope, element, attrs, ctrl) {
			var colorElement = $(element).css('border-color');
			$(element).parent().css('position', 'relative');
			if ($(element).is('input') || $(element).is('textarea')) {
				$(element).keydown(function (e) {
					executeAfterThisTime(300, function () {
						validate(e, attrs.validate, $(e.currentTarget).val());
					});
				});
			} else if ($(element).is('select')) {
				$(element).change(function (e) {
					executeAfterThisTime(300, function () {
						validate(e, attrs.validate, $(e.currentTarget).val());
					});
				});
			}

			var validate = function (e, typeValidation, value) {
				var messageError = '',
					validatePattern = '';
				switch (typeValidation) {
				case 'text':
					messageError = "Solo se permiten letras";
					validatePattern = /^[A-Za-z\s]*$/;
					break;
				case 'text-number':
					messageError = "Solo se permite letras y numeros";
					validatePattern = /^[A-Za-z\s0-9]*$/;
					break;
				case 'number':
					messageError = "No es un número válido";
					validatePattern = /^[0-9]*$/;
					break;
				case 'telephone-number':
					messageError = "No es un número telefono válido";
					validatePattern = /^[-\s0-9]*$/;
					break;
				case 'real':
					messageError = "No es un número válido";
					validatePattern = /^[+-]?\d+([,.]\d+)?$/;
					break;
				case 'email':
					messageError = "No es una direccion de correo válida";
					validatePattern = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
					break;
				case 'user':
					messageError = "Usuario no válido";
					validatePattern = /^[a-z\d_]{4,20}$/i;
					break;
				case 'password':
					messageError = "Contraseña no válida";
					validatePattern = /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
					break;
				case 'date':
					messageError = "Fecha no válida";
					validatePattern = /^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/;
					break;
				case 'url':
					messageError = "URL no válida";
					validatePattern = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)( [a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?$/;
					break;
				default:
					validatePattern = /./;

				}
				var elementError = "<span style='position:absolute;top:20px;left:100%;width:125px;' class='error' >&nbsp;" + messageError + "</span>",
					errorComponent = $(element).parent().find('.error');
				if ($(element).attr("required") && $(element).val() === '') {
					messageError = "El campo es obligatorio";
					if (!errorComponent.length) {
						$(element).css('border-color', 'red');
						$(element).after(elementError);
						$(element).parent().find('.error').text(messageError);

					}
					$(element).css('border-color', 'red');
					$(errorComponent).text(messageError);
					$(errorComponent).fadeIn();

				} else
				if (validatePattern.test(value) || $(element).val() === '') {
					if (errorComponent.length) {
						$(errorComponent).fadeOut();
						$(errorComponent).remove();
						$(element).css('border-color', colorElement);
					}
				} else if (!errorComponent.length) {
					$(element).after(elementError);
					$(element).css('border-color', 'red');
				}
			};
		}
	};
});



app.directive('validate2', function () {
	return {
		scope: {
			acceptButton: '@',
		},
		require: "ngModel",
		link: function (scope, elm, attrs, ctrl) {
			$(elm).closest('div').css('position', 'relative');

			var validate = $(elm).attr("validate");
			var validateRE = "";
			var colorElement = $(elm).css('border-color');
			var name = attrs.ngModel.substr(attrs.ngModel.lastIndexOf('.') + 1);
			var message = "";
			ctrl.$parsers.unshift(function (viewValue) {
				debugger;
				switch (validate) {
				case 'text':
					message = "Solo se permiten letras";
					validateRE = /^[A-Za-z\s]*$/;
					break;
				case 'text-number':
					message = "Solo se permite letras y numeros";
					validateRE = /^[A-Za-z\s0-9]*$/;
					break;
				case 'number':
					message = "No es un número válido";
					validateRE = /^[0-9]*$/;
					break;
				case 'telephone-number':
					message = "No es un número telefono válido";
					validateRE = /^[-\s0-9]*$/;
					break;
				case 'real':
					message = "No es un número válido";
					validateRE = /^[+-]?\d+([,.]\d+)?$/;
					break;
				case 'email':
					message = "No es una direccion de correo válida";
					validateRE = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
					break;
				case 'user':
					message = "Usuario no válido";
					validateRE = /^[a-z\d_]{4,20}$/i;
					break;
				case 'password':
					message = "Contraseña no válida";
					validateRE = /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
					break;
				case 'date':
					message = "Fecha no válida";
					validateRE = /^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/;
					break;
				case 'url':
					message = "URL no válida";
					validateRE = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)( [a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?$/;
					break;
				default:
					validateRE = /./;
				}

				var ngShow = "<span style='position:absolute;top:20px;left:100%;width:125px;' class='error' id='" + name + "'>&nbsp;" + message + "</span>";

				$(elm).focusout(function () {
					//   $("#" + name).fadeOut();
				});

				if ($(elm).attr("required") && $(elm).val() === '') {
					message = "El campo es obligatorio";
					if (!$("#" + name).length) {
						$(elm).css('border-color', 'red');
						$(elm).after(ngShow);
					}
					$(elm).css('border-color', 'red');
					$("#" + name).text(message);
					$("#" + name).fadeIn();

				} else
				if (validateRE.test(viewValue) || $(elm).val() === '') {
					ctrl.$setValidity('validate', true);
					if ($("#" + name).length) {
						$("#" + name).fadeOut();
						$(elm).css('border-color', colorElement);
					}
				} else {
					ctrl.$setValidity('validate', false);
					if (!$("#" + name).length) {
						$(elm).after(ngShow);
					} else {
						$("#" + name).text(message);
						$("#" + name).fadeIn();
						$(elm).css('border-color', 'red');
					}
					return undefined;
				}
				return viewValue;
			});


		}
	};
});