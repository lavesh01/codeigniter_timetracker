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

    public function get_task_component_by_id($componentId) {
        $this->db->where('id', $componentId);
        return $this->db->get('taskcomponent')->row_array();
    }

    public function get_all_task_components() {
        return $this->db->get('taskcomponent')->result_array();
    }

    public function get_task_component_date_id($id) {
        $this->db->where('id', $id);
        $query = $this->db->get('taskcomponent');

        if ($query->num_rows() > 0) {
            return $query->row();
        } else {
            return false;
        }
    }

    public function update_task_name($taskId, $taskName) {
        $this->db->set('taskName', $taskName)
                 ->where('id', $taskId)
                 ->update('taskcomponent');
    
        return $this->db->affected_rows() > 0;
    }
    
    
    public function deleteTaskComponent($componentId) {
        // Perform the deletion of the task component in the database
        $this->db->where('id', $componentId);
        $this->db->delete('taskcomponent');
        
        return $this->db->affected_rows() > 0;
    }
}

?>