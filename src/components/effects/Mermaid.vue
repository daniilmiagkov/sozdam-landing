<script setup lang="ts">
import { ref } from 'vue'

// Список узлов с координатами
const nodes = [
  { id: 'U', x: 50, y: 50, label: 'Пользователь' },
  { id: 'StartBtn', x: 200, y: 50, label: 'Start' },
  { id: 'StopBtn', x: 200, y: 100, label: 'Stop' },
  { id: 'SaveBtn', x: 200, y: 150, label: 'Save' },

  { id: 'MF', x: 350, y: 50, label: 'MainForm\n(UI)' },
  { id: 'App', x: 500, y: 50, label: 'Application' },
  { id: 'AR', x: 650, y: 0, label: 'AudioRecorder' },
  { id: 'PT', x: 650, y: 50, label: 'Processing\nThread' },
  { id: 'SE', x: 650, y: 100, label: 'SignalEmitter\n(Qt Signal)' },
  { id: 'SR', x: 650, y: 150, label: 'SpeechRecognizer' },
  { id: 'DH', x: 650, y: 200, label: 'DialogHistory' },
  { id: 'MP', x: 650, y: 250, label: 'ModelPipeline' },
  { id: 'FMF', x: 500, y: 300, label: 'Form Updater\n(_update_form_with_results)' },
  { id: 'FS', x: 350, y: 300, label: 'File System\n(save JSON)' },
  { id: 'LG', x: 500, y: 400, label: 'Logger/Error handling' },

  { id: 'CM', x: 800, y: 250, label: 'ComplaintModel' },
  { id: 'HM', x: 800, y: 300, label: 'MedicalHistoryModel' },

  { id: 'AnyError', x: 800, y: 400, label: 'Errors/Exceptions' },
]

// Рёбра: from -> to, с подписью
const edges = [
  { from: 'U', to: 'StartBtn', label: 'клик start' },
  { from: 'StartBtn', to: 'MF', label: 'calls' },
  { from: 'MF', to: 'App', label: 'start_recording()' },
  { from: 'App', to: 'AR' },
  { from: 'AR', to: 'AR', label: 'start_recording()' },
  { from: 'AR', to: 'PT', label: 'audio chunks' },
  { from: 'PT', to: 'AR', label: 'reads audio' },
  { from: 'PT', to: 'SR', label: 'passes audio' },
  { from: 'SR', to: 'SE', label: 'text' },
  { from: 'SE', to: 'App', label: 'emit text_processed(text)' },
  { from: 'App', to: 'DH', label: 'process_text(text)' },
  { from: 'App', to: 'MP', label: 'process_text(text)' },
  { from: 'MP', to: 'CM' },
  { from: 'MP', to: 'HM' },
  { from: 'CM', to: 'MP', label: 'complaints' },
  { from: 'HM', to: 'MP', label: 'history items' },
  { from: 'MP', to: 'FMF' },
  { from: 'FMF', to: 'MF', label: 'update_complaints/update_history' },
  { from: 'MF', to: 'FS', label: 'get_form_data' },
  { from: 'SaveBtn', to: 'MF' },
  { from: 'MF', to: 'FS', label: 'save_form_data()' },
  { from: 'AnyError', to: 'LG', label: 'logged' },
  { from: 'AR', to: 'App', label: 'stop_recording()' },
  { from: 'StopBtn', to: 'MF' },
  { from: 'MF', to: 'App', label: 'stop_recording()' },
]
</script>

<template>
  <svg
    width="1000"
    height="500"
  >
    <defs>
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        refX="10"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path
          d="M 0 0 L 10 5 L 0 10 z"
          fill="black"
        />
      </marker>
    </defs>

    <!-- линии -->
    <line
      v-for="(e, i) in edges"
      :key="i"
      :x1="nodes.find(n => n.id === e.from).x"
      :y1="nodes.find(n => n.id === e.from).y"
      :x2="nodes.find(n => n.id === e.to).x"
      :y2="nodes.find(n => n.id === e.to).y"
      stroke="black"
      stroke-width="2"
      marker-end="url(#arrow)"
    />

    <!-- узлы -->
    <g
      v-for="n in nodes"
      :key="n.id"
    >
      <rect
        :x="n.x - 50"
        :y="n.y - 20"
        width="100"
        height="40"
        fill="#f3f4f6"
        stroke="#000"
        rx="5"
        ry="5"
      />
      <text
        :x="n.x"
        :y="n.y"
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="12"
      >
        <tspan
          v-for="(line, idx) in n.label.split('\\n')"
          :x="n.x"
          :dy="idx === 0 ? 0 : 14"
        >{{ line }}</tspan>
      </text>
    </g>
  </svg>
</template>
