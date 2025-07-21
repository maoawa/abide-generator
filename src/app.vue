
<script setup lang="ts">
import { ref, watch } from 'vue';
import Data from './data.json'

const name = ref('')
const degreeSelect = ref('')
const degreeCustom = ref('');
const studySelect = ref()
const studyCustom = ref('');
const currentDate = new Date()
const agree = ref(false)
const date = ref(
    `${currentDate.getFullYear()}-0${currentDate.getMonth() + 1}-${currentDate.getDate()}`
)

const generate=()=> {
  const url = new URL('https://aui.me/your-degree/')
  url.searchParams.append('yourname', name.value)
  url.searchParams.append('date', date.value)
  url.searchParams.append('yourdegree', degreeSelect.value === 'custom' ? degreeCustom.value : degreeSelect.value)
  url.searchParams.append('study', studySelect.value === 'custom' ? studyCustom.value : studySelect.value)
  window.open(url.toString(), '_blank');
}

</script>

<template>
     <div class="container">

        <div class="title">Abide Generator</div>

        <span class="text">
            This is a simple website to generate the <strong>Honorary Degrees Certificates</strong> issued by <strong>Abide University And Institute (AUI)</strong>, a fictional university based in the <strong>United State of America</strong>.
            <div style="height: 20px"></div>
            According to AUI's website, an <strong>Honorary Degree</strong> is a special academic title awarded without traditional study, recognizing unique contributions or status. 
        </span>

        <div style="height: 34px;"></div>

        <mdui-divider></mdui-divider>
        <div class="placeholder"></div>
        <!-- GENERATOR -->

        <var-input placeholder="Your Full Name" v-model="name"></var-input>
        <br/>

        <var-select placeholder="Degree" v-model="degreeSelect">
            <var-option v-for="(degree, key) in Data.degrees" :value="key" :label="degree"></var-option>
        </var-select>
        <br/>
        <var-input v-if="degreeSelect == 'custom'" placeholder="Custom Degree" v-model="degreeCustom"
            :rules="()=>degreeCustom.length>0 ? true : 'Please enter a degree'"
        ></var-input>
        <br/>

        <var-select v-if="degreeSelect != 'custom'" placeholder="Field of Study" v-model="studySelect">
            <var-option v-for="(study,index) in Data.degreeFields[degreeSelect]" :value="index" :label="study"></var-option>
            <var-option :value="-1" label="Custom..."></var-option>
        </var-select>
        <br/>
        <var-input v-if="studySelect == -1 || degreeSelect == 'custom'" placeholder="Custom Field of Study" v-model="studyCustom"
            :rules="()=>studyCustom.length>0 ? true : 'Please enter a field of study' "></var-input>
        <br/>

        <var-date-picker v-model="date"/>

        <var-checkbox v-model="agree"></var-checkbox><span id="agree-checkbox-text">I agree not to use this degree in a way that is unlawful.</span>
        <br>
        <var-button @click="
            generate()
        ">Generate</var-button>
        <br>
        <span class="comment">By pressing Generate, you agree to be redirected to Abide University's website.</span>
        

        <!-- END OF GENERATOR -->
        <div class="placeholder"></div>
        <mdui-divider></mdui-divider>
        <div class="placeholder"></div>

        The trademarks, service marks, and logos of Abide University are the property of Dudeism LLC. Dudeism LLC is a limited liability company based in California, USA, and owner of the Abide University brand.
        <br>
        Abide Generator is an independent utility designed for quick access to specific pages on the official Abide University website. It is completely not affiliated with or endorsed by Abide University.
        <div class="placeholder"></div>
        Made with ❤️ and tremendous help from <a href="https://github.com/kuriyota" target="_blank">Kuriyota</a> by <a href="https://maao.cc/" target="_blank">Mars</a>.
        <div class="placeholder"></div>
        This website is open-source on <a href="https://github.com/maoawa/abide-generator" target="_blank">GitHub</a>.

    </div>
</template>