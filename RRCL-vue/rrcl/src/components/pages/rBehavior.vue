<template>
    <div>
        <Row>
            <Col span="8">
                <DatePicker type="date" placeholder="Select date" :open="true" :value="value" style="width: 216px;margin-left: 22%;" @on-change="changeValue"></DatePicker>
            </Col>
            <Col span="16">
                <timeline timeline-theme="lightblue">
                    <timeline-title>2018</timeline-title>
                    <timeline-item bg-color="#9dd8e0" font-color="#e166ab">Welcome to the new year!</timeline-item>
                    <timeline-item bg-color="#e6b6b0" :hollow="true">My first 100 stars on Github 🎉</timeline-item>
                    <timeline-item bg-color="#b0e6d1">keep going</timeline-item>
                    <timeline-title bg-color="#f2d7e1">2017</timeline-title>
                    <timeline-item>
                        <img src="https://user-images.githubusercontent.com/12069729/36057805-80cfc3d2-0e4e-11e8-8851-6fda091ff389.png" class="icon-heart" slot="others">
                        <p>I wrote <a href="https://github.com/luyilin/Aoba">Aoba</a></p>
                        <p class="append">A tool to create a lovely resume just with a config file.</p>
                    </timeline-item>
                    <timeline-item line-color="#a6ade4">
                        <p>And <a href="https://github.com/luyilin/Maltose">Maltose</a></p>
                        <p class="append">A cute emoticon and emoji keyboard which can generate random emoticon or emoji and no xss.</p>
                    </timeline-item>
                </timeline>
            </Col>
        </Row>
    </div>
</template>

<script>
    import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
    export default{
        data(){
            return{
                value:''
            }
        },
        components: {
            Timeline,
            TimelineItem,
            TimelineTitle
        },
        methods:{
            changeValue(data){
                this.value = data
                console.log(this.value)
            }
        }
    }    
</script>

<style>
.append {
    font-size: .8em;
    margin-top: 3px;
    color: #646C7C;
  }
  a {
    color: #bf6dcf;
    font-weight: bold;
    text-decoration: none;
  }
  .icon-heart {
    width: 20px;
  }
  .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}
  .timeline-others{
      background-color: inherit;
  }
</style>