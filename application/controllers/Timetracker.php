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
		$date = isset($input["date"]) ? $input["date"] : NULL;

		
		if (!$taskName || !$projectName || !$tags || !$billColor || !$taskComponentTime) {
			error_log('Error: Required data is missing');
			echo json_encode(array('status' => 'error', 'message' => 'Required data is missing'));
		} else {
			$data = array(
				'taskName' => $taskName,
				'projectName' => $projectName,
				'tags' => $tags,
				'billColor' => $billColor,
				'taskComponentTime' => $taskComponentTime,
				'date' => $date
			);
			
			$this->Task_model->insert($data);
			echo json_encode(array('status' => 'success'));
		}
	
    }		  

	public function get_all_task_components() {
    	$this->load->model('Task_model');
    	$taskComponents = $this->Task_model->get_all_task_components();
    	echo json_encode($taskComponents);
	}


	public function get_task_component_by_id($componentId) {
        $this->load->model('Task_model');

        $taskComponent = $this->Task_model->get_task_component_by_id($componentId);
        
        if ($taskComponent) {
            $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode($taskComponent));
        } else {
            $this->output
                ->set_status_header(404)
                ->set_output('Task component not found');
        }
    }

	public function get_task_component_date($id) {
		$this->load->model('Task_model');
		$taskComponent = $this->Task_model->get_task_component_date_id($id);
	  
		if ($taskComponent) {
		  $date = new DateTime($taskComponent->date);
		  $formattedDate = $date->format('D, M j');
	  
		  $response = array(
			'date' => $formattedDate
		  );
		  echo json_encode($response);
		} else {
		  $response = array(
			'error' => 'Task component not found'
		  );
		  echo json_encode($response);
		}
	  }
	  
	
	
	public function update_task_component($componentId) {
		$requestData = json_decode(file_get_contents('php://input'), true);
		$totalTime = $requestData['totalTime'];
	
		$existingComponent = $this->db->get_where('taskcomponent', array('id' => $componentId))->row();
		$existingTaskComponentTime = json_decode($existingComponent->taskComponentTime, true);
	
		$existingTaskComponentTime['totalTime'] = $totalTime;
	
		$updatedTaskComponentTime = json_encode($existingTaskComponentTime);
	
		$this->db->set('taskComponentTime', $updatedTaskComponentTime)
				 ->where('id', $componentId)
				 ->update('taskcomponent');
	
		if ($this->db->affected_rows() > 0) {
			$response = array('status' => 'success', 'message' => 'Task component updated');
			echo json_encode($response);
		} else {
			$response = array('status' => 'error', 'message' => 'Failed to update task component');
			echo json_encode($response);
		}
	}

	public function update_task_name() {
		$requestData = json_decode(trim(file_get_contents('php://input')), true);
		$taskId = isset($requestData['taskId']) ? $requestData['taskId'] : NULL;
		$taskName = isset($requestData['taskName']) ? $requestData['taskName'] : NULL;
	
		if (!$taskId || !$taskName) {
			echo json_encode(array('status' => 'error', 'message' => 'Required data is missing'));
			return;
		}
	
		$this->load->model('Task_model');
		$isUpdated = $this->Task_model->update_task_name($taskId, $taskName);
	
		if ($isUpdated) {
			echo json_encode(array('status' => 'success'));
		} else {
			echo json_encode(array('status' => 'error', 'message' => 'Failed to update task name'));
		}
	}
	
	

	public function delete_task_component($componentId) {
		$this->load->model('Task_model');
		
		$isDeleted = $this->Task_model->deleteTaskComponent($componentId);
		
		if ($isDeleted) {
		  $this->output
			->set_content_type('application/json')
			->set_output(json_encode(array('success' => true)));
		} else {
		  $this->output
			->set_content_type('application/json')
			->set_output(json_encode(array('success' => false, 'message' => 'Error deleting task component')));
		}
	}

}
	