<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue';
import Data from './data.json';
import dayjs from 'dayjs';

const name = ref('');
const degreeSelect = ref(Object.keys(Data.degrees)[0]);
const degreeCustom = ref('');
const studySelect = ref();
const studyCustom = ref('');
const agree = ref(false);
const date = ref(dayjs().format('YYYY-MM-DD'));
const ref_form = useTemplateRef('from');

watch(
  degreeCustom,
  () => {
    studySelect.value = 0;
  },
  {
    immediate: true
  }
);

const generate = async () => {
  if (!ref_form.value) {
    return;
  }
  const v = await ref_form.value.validate();
  if (!v) {
    return;
  }
  const url = new URL('https://aui.me/your-degree/');
  const _degree = degreeCustom.value
    ? Data.degrees[degreeSelect.value]
    : degreeCustom.value;
  const _study = studyCustom.value
    ? Data.degreeFields[studySelect.value]
    : studyCustom.value;
  url.searchParams.append('yourname', name.value);
  url.searchParams.append('date', date.value);
  url.searchParams.append('yourdegree', _degree);
  url.searchParams.append('study', _study);
  window.open(url.toString(), '_blank');
};
</script>

<template>
  <div class="container">
    <header>
      <h1 class="title">Abide Generator</h1>
      <p class="text">
        This is a simple website to generate the
        <strong>Honorary Degrees Certificates</strong>
        issued by
        <strong>Abide University And Institute (AUI)</strong>
        , a fictional university based in the
        <strong>United State of America</strong>
        .
      </p>
      <p class="text">
        According to AUI's website, an
        <strong>Honorary Degree</strong>
        is a special academic title awarded without traditional study,
        recognizing unique contributions or status.
      </p>
    </header>
    <var-divider />
    <main>
      <var-form id="from" ref="from">
        <var-input
          placeholder="Your Full Name"
          v-model="name"
          :rules="
            () => (name.length > 0 ? true : 'Please enter a name')
          "></var-input>
        <var-select placeholder="Degree" v-model="degreeSelect">
          <var-option
            v-for="(degree, key) in Data.degrees"
            :value="key"
            :label="degree"></var-option>
        </var-select>
        <var-input
          v-if="degreeSelect == 'custom'"
          placeholder="Custom Degree"
          v-model="degreeCustom"
          :rules="
            () => (degreeCustom.length > 0 ? true : 'Please enter a degree')
          "></var-input>
        <var-select
          v-if="degreeSelect != 'custom'"
          placeholder="Field of Study"
          v-model="studySelect">
          <var-option
            v-for="(study, index) in Data.degreeFields[degreeSelect]"
            :value="index"
            :label="study"></var-option>
          <var-option :value="-1" label="Custom..."></var-option>
        </var-select>
        <var-input
          v-if="studySelect == -1 || degreeSelect == 'custom'"
          placeholder="Custom Field of Study"
          v-model="studyCustom"
          :rules="
            () =>
              studyCustom.length > 0 ? true : 'Please enter a field of study'
          "></var-input>
        <var-date-picker id="date" v-model="date" />
        <var-space justify="center">
          <var-checkbox
            v-model="agree"
            :rules="() => (agree ? true : 'Please agree')">
            <span>
              I agree not to use this degree in a way that is unlawful.
            </span>
          </var-checkbox>
        </var-space>
        <var-button @click="generate()">Generate</var-button>
        <p class="comment">
          By pressing Generate, you open a new tab to Abide University's
          website.
        </p>
      </var-form>
    </main>
    <var-divider />
    <footer>
      <p>
        The trademarks, service marks, and logos of Abide University are the
        property of Dudeism LLC. Dudeism LLC is a limited liability company
        based in California, USA, and owner of the Abide University brand.
      </p>
      <p>
        Abide Generator is an independent utility designed for quick access to
        specific pages on the official Abide University website. It is
        completely not affiliated with or endorsed by Abide University.
      </p>
      <p>
        Made with ❤️ and tremendous help from
        <a href="https://github.com/kuriyota" target="_blank">Kuriyota</a>
        by
        <a href="https://maao.cc/" target="_blank">Mars</a>
        .
      </p>
      <p>
        This website is open-source on
        <a href="https://github.com/maoawa/abide-generator" target="_blank">
          GitHub
        </a>
        .
      </p>
    </footer>
  </div>
</template>
