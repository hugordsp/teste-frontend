<template>
    <div class="container">
      <section class="jumbotron">
        <div class="posts" v-if="content.data">
        <ul>
          <li v-for="project in content.data" :key="project.id">
            <div id="project-div">
              <p>{{project.name}}</p>
              <p>{{project.status}}</p>
            </div>
          </li>
        </ul>
      </div>
      </section>
    </div>
  </template>
  
  <script>
  import ProjectService from "../services/project.service";
  
  export default {
    name: "Home",
    data() {
      return {
        content: "",
      };
    },
    mounted() {
      ProjectService.listProjects().then(
        (response) => {
            console.log(response.data)
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
    },
  };
  </script>