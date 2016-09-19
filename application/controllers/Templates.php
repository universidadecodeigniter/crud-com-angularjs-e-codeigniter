<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Templates extends CI_Controller {
	public function view($view)
	{
		$this->load->view('templates/'.$view);
	}
}
