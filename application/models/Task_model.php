<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Task_model extends CI_Model {
    
	public function insert($data) {
        $this->db->insert('taskcomponent', $data);
        if (!$data) {
            echo $this->db->error();
        }
        echo $this->db->last_query();

    }
    
    public function get_all() {
        return $this->db->get('taskcomponent')->result_array();
    }

    public function get_all_task_components() {
        return $this->db->get('taskcomponent')->result_array();
    }
    
}

?>