<template>
  <div class="container">
    <section class="my-3">
      <div class="posts" v-if="content.data">

        <button type="button" class="btn btn-secondary" @click="showModal('create')">
          New
        </button>
        <Modal v-show="isModalVisible" @close="closeModal">
          <template v-slot:header>
            {{modalAction =="create"? "Create new project": "Edit project"}}
          </template>
          <template v-slot:footer>
            <button type="button" class="btn-secondary" @click="closeModal" aria-label="Close modal">
              Close
            </button>
            <button type="button" class="btn-primary" @click="handleClick" aria-label="Save Changes">
              Save
            </button>
          </template>
        </Modal>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Project name</th>
              <th scope="col">Start date</th>
              <th scope="col">End date</th>
              <th scope="col">Value</th>
              <th scope="col">Status</th>
              <th scope="col">Creator</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in content.data" :key="project.id">
              <th scope="row">{{ project.id }}</th>
              <td>{{ project.name }}</td>
              <td>{{ project.start_date }}</td>
              <td>{{ project.end_date }}</td>
              <td>{{ project.value.toFixed(2) }}</td>
              <td>{{ project.status }}</td>
              <td>{{ project.creator.name }}</td>
              <td> <button type="button" class="btn btn-primary" @click="showModal('edit',
                {
                  id:  project.id,
                  name: project.name,
                  startDate: project.start_date,
                  endDate: project.end_date,
                  value: project.value.toFixed(2),
                  status: project.status,
                }
              )">
                  Edit
                </button>
                
                <button type="button" class="btn btn-danger m-2" @click="deleteProject(project.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><button class="page-link" v-on:click="getPage(this.currentPage - 1)"
                :disabled="1 == this.currentPage">Previous</button></li>
            <li class="page-item" v-for="(page) in [...Array(content.meta.last_page).keys()]" :key="page">
              <button class="page-link" v-on:click="getPage($event.target.innerHTML)">{{ page + 1 }}</button>
            </li>
            <li class="page-item"><button class="page-link" v-on:click="getPage(this.currentPage + 1)"
                :disabled="content.meta.last_page == this.currentPage">Next</button></li>
          </ul>
        </nav>
      </div>
    </section>
  </div>
</template>
  
<script>
import ProjectService from "../services/project.service";
import Modal from '../components/Modal.vue';

export default {
  name: "Home",
  components: {
    Modal,
  },
  data() {
    return {
      content: "",
      currentPage: 0,
      isModalVisible: false,
      modalAction: '',
      editId: -1
    };
  },
  mounted() {
    this.getPage(1);
  },
  methods: {
    showModal(action, data) {
      this.modalAction = action;
      if (action == 'create') {
        document.getElementById('projectName').value = '';
        document.getElementById('startDate').value = '';
        document.getElementById('endDate').value = '';
        document.getElementById('value').value = '';
        document.getElementById('status').value = '';
      }
      else if (action == 'edit') {
        const {
          id,
          name,
          startDate,
          endDate,
          value,
          status
        } = data;
        this.editId = id;
        document.getElementById('projectName').value = name;
        document.getElementById('startDate').value = startDate;
        document.getElementById('endDate').value = endDate;
        document.getElementById('value').value = value;
        document.getElementById('status').value = status;
      }
      this.isModalVisible = true;
    },
    handleClick() {
      if(this.modalAction == 'create') {
        this.createProject()
      }
      else if(this.modalAction == 'edit') {
        this.editProject()
      }
    },
    closeModal() {
      this.isModalVisible = false;
    },

    editProject() {
      const name = document.getElementById('projectName').value;
      const startDate = document.getElementById('startDate').value;
      const endDate = document.getElementById('endDate').value;
      const value = document.getElementById('value').value;
      const status = document.getElementById('status').value;
      console.log({
        name,
        startDate,
        endDate,
        value,
        status
      });
      ProjectService.editProject({
        id: this.editId,
        name,
        startDate,
        endDate,
        value,
        status
      }).then(
        (response) => {
          console.log(response.data);
          this.getPage(this.currentPage, true);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
      this.closeModal()
    },
    createProject() {
      const name = document.getElementById('projectName').value;
      const startDate = document.getElementById('startDate').value;
      const endDate = document.getElementById('endDate').value;
      const value = document.getElementById('value').value;
      const status = document.getElementById('status').value;
      console.log({
        name,
        startDate,
        endDate,
        value,
        status
      });
      ProjectService.createProject({
        name,
        startDate,
        endDate,
        value,
        status
      }).then(
        (response) => {
          console.log(response.data);
          this.getPage(this.currentPage, true);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
      this.closeModal()
    },
    getPage(page, refresh) {
      if (this.currentPage !== Number(page) || refresh) {
        this.currentPage = Number(page);
        ProjectService.listProjects(page).then(
          (response) => {
            console.log(response.data)
            console.log(response.data.meta.last_page, this.currentPage)
            this.content = response.data;
          },
          (error) => {
            this.content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      }
    },

    deleteProject(id) {
      
      ProjectService.deleteProject({
        id,
      }).then(
        (response) => {
          console.log(response.data);
          this.getPage(this.currentPage, true);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
  }


  
};
</script>

<style>
button:disabled {
  background-color: #e9ecef;
}

button:disabled:hover {
  color: #007bff;
}
</style>