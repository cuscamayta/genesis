select * from database_production.modules;

insert into database_production.modules (title, class, createdat, updatedat) values ('Seguridad', 'fa fa-home', now(), now());
insert into database_production.modules (title, class, createdat, updatedat) values ('Configuración', 'fa fa-edit', now(), now());
insert into database_production.modules (title, class, createdat, updatedat) values ('Administración', 'fa fa-desktop', now(), now());
insert into database_production.modules (title, class, createdat, updatedat) values ('Ventas', 'fa fa-table', now(), now());
insert into database_production.modules (title, class, createdat, updatedat) values ('Manifiesto', 'fa fa-bar-chart-o', now(), now());
insert into database_production.modules (title, class, createdat, updatedat) values ('Reportes', 'fa fa-clone', now(), now());

select * from database_production.pages;
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Ajustes', 'setting', now(), now(),1);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Rol', 'role', now(), now(),1);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Usuario', 'user', now(), now(),1);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Permisos', 'permit', now(), now(),1);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Sucursales por usuario', 'useroffice', now(), now(),1);

insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Tipo de bus', 'bustype', now(), now(),2);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Buses', 'bus', now(), now(),2);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Tipo chofer', 'drivertype', now(), now(),2);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Chofer', 'driver', now(), now(),2);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Destinos', 'destination', now(), now(),2);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Sucursal', 'office', now(), now(),2);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Rutas', 'course', now(), now(),2);

insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Dosificación', 'orderbook', now(), now(),3);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Itinerario', 'travel', now(), now(),3);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Programación diaria', 'schedule', now(), now(),3);

insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Ticket', 'ticket', now(), now(),4);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Anular factura', 'invalidate', now(), now(),4);

insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Manifiestos de pasajeros', 'manifest', now(), now(),5);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Manifiestos de equipajes', 'baggage', now(), now(),5);

insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Ventas diarias', '', now(), now(),6);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Arqueo de caja', 'dailycash', now(), now(),6);
