<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Timetracker extends CI_Controller {

	public function add() {
		$this->load->model('Task_model');
		$tags = $this->input->post('tags');
		$tags = is_array($tags) ? implode(',', $tags) : '';

		$data = array(
			'bill' => $billColor,
			'id' => $id,
			'projectName' => $projectName,
			'tags' => json_encode($tags),
			'taskComponentTime' => json_encode($taskComponentTime),
			'taskName' => $taskName
		);
		 
		$this->Task_model->insert($data);
		redirect('timetracker/insert');
	}
	
	public function index() {
		$this->load->model('Task_model');
		$data['tasks'] = $this->Task_model->get_all();
		$this->load->view('home', $data);
		print_r($_POST);
	}

	// In your controller file
	public function save_task_components() {
		$this->load->model('Task_model');
		$data = $this->input->post('task_components');
		if (!$data) {
			error_log('Error: Data is null or empty');
		} else {
			print_r($data);
			foreach ($data as $component) {
				$this->Task_model->insert($component);
			}
			echo json_encode(array('status' => 'success'));
		}
		
	}
 
}