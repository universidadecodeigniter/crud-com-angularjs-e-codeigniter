<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

$route['templates/(:any)'] = "templates/view/$1";
$route['notas'] = "Notas/index";
$route['notasCreate']['post'] = "Notas/store";
$route['notasEdit/(:any)'] = "Notas/edit/$1";
$route['notasUpdate/(:any)']['put'] = "Notas/update/$1";
$route['notasDelete/(:any)']['delete'] = "Notas/delete/$1";
