<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Timetracker extends CI_Controller {
	
	public function index() {
		$this->load->model('Task_model');
		$data['tasks'] = $this->Task_model->get_all();
		$this->load->view('home', $data);
		// print_r($data);
	}
	
	public function getId() {
        $this->load->model('Task_model');
        $taskCompId = $this->input->get("taskCompId");
		
		$id = $this->Task_model->getId($taskCompId);
        echo $id;
    }

	public function save_task_components() {

		$this->load->model('Task_model');
			
		$input = json_decode(trim(file_get_contents('php://input')), true);
		
		// $taskName = $input["taskName"];
		// $projectName = $input["projectName"];
		// $tags = json_encode($input["tags"]);
		// $billColor = $input["billColor"];
		// $taskComponentTime = json_encode($input["taskComponentTime"]);

		$taskName = isset($input["taskName"]) ? $input["taskName"] : NULL;
		$projectName = isset($input["projectName"]) ? $input["projectName"] : NULL;
		$tags = isset($input["tags"]) ? json_encode($input["tags"]) : NULL;
		$billColor = isset($input["billColor"]) ? $input["billColor"] : NULL;
		$taskComponentTime = isset($input["taskComponentTime"]) ? json_encode($input["taskComponentTime"]) : NULL;

		
		if (!$taskName || !$projectName || !$tags || !$billColor || !$taskComponentTime) {
			error_log('Error: Required data is missing');
			echo json_encode(array('status' => 'error', 'message' => 'Required data is missing'));
		} else {
			$data = array(
				'taskName' => $taskName,
				'projectName' => $projectName,
				'tags' => $tags,
				'billColor' => $billColor,
				'taskComponentTime' => $taskComponentTime
			);
			
			$this->Task_model->insert($data);
			echo json_encode(array('status' => 'success'));
		}

		// $data = array(
		// 	'taskName' => $taskName,
		// 	'projectName' => $projectName,
		// 	'tags' => $tags,
		// 	'billColor' => $billColor,
		// 	'taskComponentTime' => $taskComponentTime
		// );
		
		// $this->Task_model->insert($data);
		// echo json_encode(array('status' => 'success'));
	
}		  

	public function get_all_task_components() {
    	$this->load->model('Task_model');
    	$taskComponents = $this->Task_model->get_all_task_components();
    	echo json_encode($taskComponents);
	}

}
	