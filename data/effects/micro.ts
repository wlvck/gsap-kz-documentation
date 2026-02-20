import type { Effect } from "~/types/effects";

export const microEffects: Effect[] = [
  // Input effects
  {
    id: "input-focus",
    name: "Input Focus Animation",
    nameKz: "Input фокус анимациясы",
    description: "Animated input field on focus",
    descriptionKz: "Фокус кезінде анимациялық input өрісі",
    category: "micro",
    playgroundType: "hover",
    defaultText: "INPUT",
    code: {
      vue: `<template>
  <div class="input-wrapper">
    <input
      ref="inputRef"
      type="text"
      placeholder="Type here..."
      @focus="onFocus"
      @blur="onBlur"
    />
    <span ref="lineRef" class="input-line" />
    <span ref="labelRef" class="input-label">Email</span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const inputRef = ref(null);
const lineRef = ref(null);
const labelRef = ref(null);

const onFocus = () => {
  gsap.to(lineRef.value, {
    scaleX: 1,
    duration: 0.3,
    ease: "power2.out"
  });
  gsap.to(labelRef.value, {
    y: -25,
    scale: 0.8,
    color: "#0ae448",
    duration: 0.3,
    ease: "power2.out"
  });
};

const onBlur = () => {
  if (!inputRef.value.value) {
    gsap.to(lineRef.value, {
      scaleX: 0,
      duration: 0.3
    });
    gsap.to(labelRef.value, {
      y: 0,
      scale: 1,
      color: "#a1a1a6",
      duration: 0.3
    });
  }
};
</script>`,
      script: `const input = document.querySelector("input");
const line = document.querySelector(".input-line");
const label = document.querySelector(".input-label");

input.addEventListener("focus", () => {
  gsap.to(line, { scaleX: 1, duration: 0.3 });
  gsap.to(label, { y: -25, scale: 0.8, color: "#0ae448", duration: 0.3 });
});

input.addEventListener("blur", () => {
  if (!input.value) {
    gsap.to(line, { scaleX: 0, duration: 0.3 });
    gsap.to(label, { y: 0, scale: 1, color: "#a1a1a6", duration: 0.3 });
  }
});`,
      css: `.input-wrapper {
  position: relative;
  width: 300px;
}

input {
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid #2a2d2b;
  color: #fffce1;
  font-size: 1rem;
  outline: none;
}

.input-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #0ae448;
  transform: scaleX(0);
  transform-origin: left;
}

.input-label {
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: #a1a1a6;
  pointer-events: none;
  transform-origin: left;
}`,
    },
  },
  {
    id: "input-validation",
    name: "Input Validation",
    nameKz: "Input валидация",
    description: "Input with validation feedback",
    descriptionKz: "Валидация кері байланысы бар input",
    category: "micro",
    playgroundType: "hover",
    defaultText: "VALIDATION",
    code: {
      vue: `<template>
  <div class="validation-wrapper">
    <input
      ref="inputRef"
      type="email"
      placeholder="Enter email"
      v-model="email"
      @input="validate"
    />
    <span ref="iconRef" class="validation-icon">
      {{ isValid ? '✓' : '✗' }}
    </span>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import gsap from "gsap";

const inputRef = ref(null);
const iconRef = ref(null);
const email = ref("");
const isValid = ref(false);

const validate = () => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  const valid = emailRegex.test(email.value);

  if (valid !== isValid.value) {
    isValid.value = valid;

    gsap.fromTo(iconRef.value,
      { scale: 0, rotation: -180 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "back.out(1.7)"
      }
    );

    gsap.to(inputRef.value, {
      borderColor: valid ? "#0ae448" : "#ef4444",
      duration: 0.3
    });
  }
};
</script>`,
      script: `const input = document.querySelector("input");
const icon = document.querySelector(".validation-icon");
let isValid = false;

input.addEventListener("input", () => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  const valid = emailRegex.test(input.value);

  if (valid !== isValid) {
    isValid = valid;
    gsap.fromTo(icon,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.7)" }
    );
    gsap.to(input, { borderColor: valid ? "#0ae448" : "#ef4444", duration: 0.3 });
  }
});`,
      css: `.validation-wrapper {
  position: relative;
  width: 300px;
}

input {
  width: 100%;
  padding: 1rem;
  padding-right: 3rem;
  background: #1c1e1d;
  border: 2px solid #2a2d2b;
  border-radius: 8px;
  color: #fffce1;
  font-size: 1rem;
  outline: none;
}

.validation-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #0ae448;
}`,
    },
  },
  {
    id: "checkbox",
    name: "Animated Checkbox",
    nameKz: "Анимациялық checkbox",
    description: "Custom checkbox with animation",
    descriptionKz: "Анимациясы бар жеке checkbox",
    category: "micro",
    playgroundType: "hover",
    defaultText: "CHECKBOX",
    code: {
      vue: `<template>
  <label class="checkbox-wrapper" @click="toggle">
    <div ref="boxRef" class="checkbox-box">
      <svg ref="checkRef" viewBox="0 0 24 24">
        <polyline points="4,12 9,17 20,6" />
      </svg>
    </div>
    <span>Accept terms</span>
  </label>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const boxRef = ref(null);
const checkRef = ref(null);
const isChecked = ref(false);

onMounted(() => {
  const path = checkRef.value.querySelector("polyline");
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
});

const toggle = () => {
  isChecked.value = !isChecked.value;
  const path = checkRef.value.querySelector("polyline");

  if (isChecked.value) {
    gsap.to(boxRef.value, {
      backgroundColor: "#0ae448",
      borderColor: "#0ae448",
      duration: 0.2
    });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  } else {
    gsap.to(boxRef.value, {
      backgroundColor: "transparent",
      borderColor: "#2a2d2b",
      duration: 0.2
    });
    gsap.to(path, {
      strokeDashoffset: path.getTotalLength(),
      duration: 0.2
    });
  }
};
</script>`,
      script: `const checkbox = document.querySelector(".checkbox-wrapper");
const box = checkbox.querySelector(".checkbox-box");
const path = checkbox.querySelector("polyline");
const length = path.getTotalLength();
let isChecked = false;

gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

checkbox.addEventListener("click", () => {
  isChecked = !isChecked;

  if (isChecked) {
    gsap.to(box, { backgroundColor: "#0ae448", borderColor: "#0ae448", duration: 0.2 });
    gsap.to(path, { strokeDashoffset: 0, duration: 0.3 });
  } else {
    gsap.to(box, { backgroundColor: "transparent", borderColor: "#2a2d2b", duration: 0.2 });
    gsap.to(path, { strokeDashoffset: length, duration: 0.2 });
  }
});`,
      css: `.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  color: #fffce1;
}

.checkbox-box {
  width: 24px;
  height: 24px;
  border: 2px solid #2a2d2b;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-box svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: #0e100f;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}`,
    },
  },
  {
    id: "toggle",
    name: "Toggle Switch",
    nameKz: "Toggle ауыстырғыш",
    description: "Animated toggle switch",
    descriptionKz: "Анимациялық toggle ауыстырғыш",
    category: "micro",
    playgroundType: "hover",
    defaultText: "TOGGLE",
    code: {
      vue: `<template>
  <div class="toggle-wrapper" @click="toggle">
    <div ref="trackRef" class="toggle-track">
      <div ref="thumbRef" class="toggle-thumb" />
    </div>
    <span>{{ isOn ? 'ON' : 'OFF' }}</span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const trackRef = ref(null);
const thumbRef = ref(null);
const isOn = ref(false);

const toggle = () => {
  isOn.value = !isOn.value;

  gsap.to(thumbRef.value, {
    x: isOn.value ? 24 : 0,
    duration: 0.3,
    ease: "back.out(1.5)"
  });

  gsap.to(trackRef.value, {
    backgroundColor: isOn.value ? "#0ae448" : "#2a2d2b",
    duration: 0.2
  });
};
</script>`,
      script: `const wrapper = document.querySelector(".toggle-wrapper");
const track = wrapper.querySelector(".toggle-track");
const thumb = wrapper.querySelector(".toggle-thumb");
let isOn = false;

wrapper.addEventListener("click", () => {
  isOn = !isOn;

  gsap.to(thumb, {
    x: isOn ? 24 : 0,
    duration: 0.3,
    ease: "back.out(1.5)"
  });

  gsap.to(track, {
    backgroundColor: isOn ? "#0ae448" : "#2a2d2b",
    duration: 0.2
  });
});`,
      css: `.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  color: #fffce1;
}

.toggle-track {
  width: 52px;
  height: 28px;
  background: #2a2d2b;
  border-radius: 14px;
  padding: 2px;
}

.toggle-thumb {
  width: 24px;
  height: 24px;
  background: #fffce1;
  border-radius: 50%;
}`,
    },
  },
  {
    id: "select",
    name: "Animated Select",
    nameKz: "Анимациялық select",
    description: "Custom select dropdown with animation",
    descriptionKz: "Анимациясы бар жеке select dropdown",
    category: "micro",
    playgroundType: "hover",
    defaultText: "SELECT",
    code: {
      vue: `<template>
  <div class="select-wrapper">
    <div ref="selectRef" class="select-trigger" @click="toggleOpen">
      <span>{{ selected || 'Choose option' }}</span>
      <span ref="arrowRef" class="arrow">▼</span>
    </div>
    <div ref="optionsRef" class="select-options">
      <div
        v-for="opt in options"
        :key="opt"
        class="select-option"
        @click="selectOption(opt)"
      >
        {{ opt }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const selectRef = ref(null);
const optionsRef = ref(null);
const arrowRef = ref(null);
const isOpen = ref(false);
const selected = ref("");
const options = ["Option 1", "Option 2", "Option 3"];

const toggleOpen = () => {
  isOpen.value = !isOpen.value;

  gsap.to(arrowRef.value, {
    rotation: isOpen.value ? 180 : 0,
    duration: 0.3
  });

  if (isOpen.value) {
    gsap.to(optionsRef.value, {
      height: "auto",
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  } else {
    gsap.to(optionsRef.value, {
      height: 0,
      opacity: 0,
      duration: 0.2
    });
  }
};

const selectOption = (opt) => {
  selected.value = opt;
  toggleOpen();
};
</script>`,
      script: `const select = document.querySelector(".select-trigger");
const options = document.querySelector(".select-options");
const arrow = document.querySelector(".arrow");
let isOpen = false;

select.addEventListener("click", () => {
  isOpen = !isOpen;

  gsap.to(arrow, { rotation: isOpen ? 180 : 0, duration: 0.3 });

  if (isOpen) {
    gsap.to(options, { height: "auto", opacity: 1, duration: 0.3 });
  } else {
    gsap.to(options, { height: 0, opacity: 0, duration: 0.2 });
  }
});`,
      css: `.select-wrapper {
  position: relative;
  width: 250px;
}

.select-trigger {
  padding: 1rem;
  background: #1c1e1d;
  border: 2px solid #2a2d2b;
  border-radius: 8px;
  color: #fffce1;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.arrow {
  font-size: 0.8rem;
}

.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #1c1e1d;
  border: 2px solid #2a2d2b;
  border-radius: 8px;
  margin-top: 4px;
  height: 0;
  opacity: 0;
  overflow: hidden;
}

.select-option {
  padding: 0.75rem 1rem;
  color: #fffce1;
  cursor: pointer;
}

.select-option:hover {
  background: #0ae448;
  color: #0e100f;
}`,
    },
  },
  // Notification effects
  {
    id: "toast",
    name: "Toast Notification",
    nameKz: "Toast хабарлама",
    description: "Animated toast notification",
    descriptionKz: "Анимациялық toast хабарлама",
    category: "micro",
    playgroundType: "hover",
    defaultText: "TOAST",
    code: {
      vue: `<template>
  <div class="toast-container">
    <button @click="showToast" class="toast-btn">Show Toast</button>
    <div ref="toastRef" class="toast">
      <span class="toast-icon">✓</span>
      <span>Successfully saved!</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const toastRef = ref(null);

const showToast = () => {
  const tl = gsap.timeline();

  tl.fromTo(toastRef.value,
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
  )
  .to(toastRef.value, {
    y: 100,
    opacity: 0,
    duration: 0.3,
    delay: 2
  });
};
</script>`,
      script: `const btn = document.querySelector(".toast-btn");
const toast = document.querySelector(".toast");

btn.addEventListener("click", () => {
  const tl = gsap.timeline();

  tl.fromTo(toast,
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
  )
  .to(toast, { y: 100, opacity: 0, duration: 0.3, delay: 2 });
});`,
      css: `.toast-container {
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-btn {
  padding: 1rem 2rem;
  background: #0ae448;
  color: #0e100f;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.toast {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: #1c1e1d;
  border: 1px solid #0ae448;
  border-radius: 8px;
  color: #fffce1;
  opacity: 0;
}

.toast-icon {
  color: #0ae448;
  font-size: 1.2rem;
}`,
    },
  },
  {
    id: "tooltip",
    name: "Animated Tooltip",
    nameKz: "Анимациялық tooltip",
    description: "Tooltip with animation",
    descriptionKz: "Анимациясы бар tooltip",
    category: "micro",
    playgroundType: "hover",
    defaultText: "TOOLTIP",
    code: {
      vue: `<template>
  <div class="tooltip-wrapper">
    <button
      ref="triggerRef"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
    >
      Hover me
    </button>
    <div ref="tooltipRef" class="tooltip">
      This is a tooltip message
      <div class="tooltip-arrow" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const triggerRef = ref(null);
const tooltipRef = ref(null);

const showTooltip = () => {
  gsap.to(tooltipRef.value, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.3,
    ease: "back.out(1.7)"
  });
};

const hideTooltip = () => {
  gsap.to(tooltipRef.value, {
    opacity: 0,
    y: 10,
    scale: 0.9,
    duration: 0.2
  });
};
</script>`,
      script: `const trigger = document.querySelector(".tooltip-trigger");
const tooltip = document.querySelector(".tooltip");

trigger.addEventListener("mouseenter", () => {
  gsap.to(tooltip, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" });
});

trigger.addEventListener("mouseleave", () => {
  gsap.to(tooltip, { opacity: 0, y: 10, scale: 0.9, duration: 0.2 });
});`,
      css: `.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

button {
  padding: 1rem 2rem;
  background: #1c1e1d;
  color: #fffce1;
  border: 2px solid #2a2d2b;
  border-radius: 8px;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px) scale(0.9);
  margin-bottom: 10px;
  padding: 0.75rem 1rem;
  background: #0ae448;
  color: #0e100f;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  font-size: 0.9rem;
}

.tooltip-arrow {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #0ae448;
}`,
    },
  },
  {
    id: "modal",
    name: "Modal Animation",
    nameKz: "Modal анимациясы",
    description: "Animated modal dialog",
    descriptionKz: "Анимациялық modal диалогы",
    category: "micro",
    playgroundType: "hover",
    defaultText: "MODAL",
    code: {
      vue: `<template>
  <div class="modal-container">
    <button @click="openModal" class="modal-btn">Open Modal</button>
    <div ref="overlayRef" class="modal-overlay" @click="closeModal">
      <div ref="modalRef" class="modal" @click.stop>
        <h3>Modal Title</h3>
        <p>This is modal content with smooth animation.</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const overlayRef = ref(null);
const modalRef = ref(null);

const openModal = () => {
  gsap.to(overlayRef.value, {
    opacity: 1,
    visibility: "visible",
    duration: 0.3
  });
  gsap.fromTo(modalRef.value,
    { scale: 0.8, y: 50 },
    { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
  );
};

const closeModal = () => {
  gsap.to(modalRef.value, {
    scale: 0.8,
    y: 50,
    duration: 0.2
  });
  gsap.to(overlayRef.value, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      gsap.set(overlayRef.value, { visibility: "hidden" });
    }
  });
};
</script>`,
      script: `const btn = document.querySelector(".modal-btn");
const overlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");
const closeBtn = modal.querySelector("button");

const openModal = () => {
  gsap.to(overlay, { opacity: 1, visibility: "visible", duration: 0.3 });
  gsap.fromTo(modal, { scale: 0.8, y: 50 }, { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" });
};

const closeModal = () => {
  gsap.to(modal, { scale: 0.8, y: 50, duration: 0.2 });
  gsap.to(overlay, { opacity: 0, duration: 0.3 });
};

btn.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
closeBtn.addEventListener("click", closeModal);`,
      css: `/* Container needs position: relative */
.modal-container {
  position: relative;
  min-height: 200px;
}

.modal-btn {
  padding: 1rem 2rem;
  background: #0ae448;
  color: #0e100f;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  opacity: 0;
  visibility: hidden;
}

.modal {
  background: #1c1e1d;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 300px;
  text-align: center;
  margin: 1rem;
}

.modal h3 {
  color: #0ae448;
  margin-bottom: 1rem;
}

.modal p {
  color: #a1a1a6;
  margin-bottom: 1.5rem;
}

.modal button {
  padding: 0.75rem 1.5rem;
  background: #0ae448;
  color: #0e100f;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}`,
    },
  },
  {
    id: "popover",
    name: "Popover",
    nameKz: "Popover",
    description: "Animated popover component",
    descriptionKz: "Анимациялық popover компоненті",
    category: "micro",
    playgroundType: "hover",
    defaultText: "POPOVER",
    code: {
      vue: `<template>
  <div class="popover-wrapper">
    <button ref="triggerRef" @click="togglePopover">
      Click me
    </button>
    <div ref="popoverRef" class="popover">
      <h4>Popover Title</h4>
      <p>Some content in the popover.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const triggerRef = ref(null);
const popoverRef = ref(null);
const isOpen = ref(false);

const togglePopover = () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    gsap.fromTo(popoverRef.value,
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
    );
  } else {
    gsap.to(popoverRef.value, {
      opacity: 0,
      scale: 0.9,
      y: 10,
      duration: 0.2
    });
  }
};
</script>`,
      script: `const trigger = document.querySelector(".popover-trigger");
const popover = document.querySelector(".popover");
let isOpen = false;

trigger.addEventListener("click", () => {
  isOpen = !isOpen;

  if (isOpen) {
    gsap.fromTo(popover,
      { opacity: 0, scale: 0.9, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
    );
  } else {
    gsap.to(popover, { opacity: 0, scale: 0.9, y: 10, duration: 0.2 });
  }
});`,
      css: `.popover-wrapper {
  position: relative;
  display: inline-block;
}

button {
  padding: 1rem 2rem;
  background: #1c1e1d;
  color: #fffce1;
  border: 2px solid #2a2d2b;
  border-radius: 8px;
  cursor: pointer;
}

.popover {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  padding: 1rem;
  background: #1c1e1d;
  border: 1px solid #0ae448;
  border-radius: 8px;
  min-width: 200px;
  opacity: 0;
}

.popover h4 {
  color: #0ae448;
  margin-bottom: 0.5rem;
}

.popover p {
  color: #a1a1a6;
  font-size: 0.9rem;
}`,
    },
  },
  // Feedback effects
  {
    id: "copy-feedback",
    name: "Copy Feedback",
    nameKz: "Көшіру кері байланысы",
    description: "Copy to clipboard with feedback",
    descriptionKz: "Кері байланыспен буферге көшіру",
    category: "micro",
    playgroundType: "hover",
    defaultText: "COPY",
    code: {
      vue: `<template>
  <div class="copy-wrapper">
    <code>npm install gsap</code>
    <button ref="btnRef" @click="copy">
      <span ref="iconRef">📋</span>
      <span ref="textRef">Copy</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const btnRef = ref(null);
const iconRef = ref(null);
const textRef = ref(null);
const isCopied = ref(false);

const copy = async () => {
  if (isCopied.value) return;

  await navigator.clipboard.writeText("npm install gsap");
  isCopied.value = true;

  gsap.to(iconRef.value, {
    scale: 0,
    duration: 0.15,
    onComplete: () => {
      iconRef.value.textContent = "✓";
      gsap.to(iconRef.value, { scale: 1, duration: 0.2, ease: "back.out(1.7)" });
    }
  });

  gsap.to(textRef.value, { opacity: 0, x: -10, duration: 0.15 });
  gsap.to(textRef.value, {
    opacity: 1,
    x: 0,
    duration: 0.2,
    delay: 0.15,
    onStart: () => { textRef.value.textContent = "Copied!"; }
  });

  gsap.to(btnRef.value, { backgroundColor: "#0ae448", duration: 0.2 });

  setTimeout(() => {
    isCopied.value = false;
    iconRef.value.textContent = "📋";
    textRef.value.textContent = "Copy";
    gsap.to(btnRef.value, { backgroundColor: "#1c1e1d", duration: 0.2 });
  }, 2000);
};
</script>`,
      script: `const btn = document.querySelector(".copy-btn");
const icon = btn.querySelector(".icon");
const text = btn.querySelector(".text");

btn.addEventListener("click", async () => {
  await navigator.clipboard.writeText("npm install gsap");

  gsap.to(icon, { scale: 0, duration: 0.15 });
  gsap.to(icon, { scale: 1, duration: 0.2, delay: 0.15 });
  icon.textContent = "✓";
  text.textContent = "Copied!";
  gsap.to(btn, { backgroundColor: "#0ae448", duration: 0.2 });

  setTimeout(() => {
    icon.textContent = "📋";
    text.textContent = "Copy";
    gsap.to(btn, { backgroundColor: "#1c1e1d", duration: 0.2 });
  }, 2000);
});`,
      css: `.copy-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #0e100f;
  border-radius: 8px;
}

code {
  color: #0ae448;
  font-family: monospace;
}

button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #1c1e1d;
  color: #fffce1;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}`,
    },
  },
  {
    id: "like-heart",
    name: "Like Heart Animation",
    nameKz: "Жүрек лайк анимациясы",
    description: "Heart like button with animation",
    descriptionKz: "Анимациялық жүрек лайк батырмасы",
    category: "micro",
    playgroundType: "hover",
    defaultText: "LIKE",
    code: {
      vue: `<template>
  <button ref="btnRef" class="like-btn" @click="toggleLike">
    <span ref="heartRef" class="heart" :class="{ liked: isLiked }">
      {{ isLiked ? '❤️' : '🤍' }}
    </span>
    <span ref="countRef">{{ count }}</span>
  </button>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const btnRef = ref(null);
const heartRef = ref(null);
const countRef = ref(null);
const isLiked = ref(false);
const count = ref(42);

const toggleLike = () => {
  isLiked.value = !isLiked.value;
  count.value += isLiked.value ? 1 : -1;

  if (isLiked.value) {
    gsap.timeline()
      .to(heartRef.value, { scale: 1.5, duration: 0.15 })
      .to(heartRef.value, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });

    // Create particles
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement("span");
      particle.className = "particle";
      particle.textContent = "❤️";
      btnRef.value.appendChild(particle);

      gsap.fromTo(particle,
        { scale: 0, x: 0, y: 0 },
        {
          scale: 0.5,
          x: (Math.random() - 0.5) * 60,
          y: -40 - Math.random() * 30,
          opacity: 0,
          duration: 0.6,
          onComplete: () => particle.remove()
        }
      );
    }
  } else {
    gsap.to(heartRef.value, { scale: 0.8, duration: 0.1 });
    gsap.to(heartRef.value, { scale: 1, duration: 0.2, delay: 0.1 });
  }

  gsap.fromTo(countRef.value,
    { y: isLiked.value ? 10 : -10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.2 }
  );
};
</script>`,
      script: `const btn = document.querySelector(".like-btn");
const heart = btn.querySelector(".heart");
const countEl = btn.querySelector(".count");
let isLiked = false;
let count = 42;

btn.addEventListener("click", () => {
  isLiked = !isLiked;
  count += isLiked ? 1 : -1;
  countEl.textContent = count;
  heart.textContent = isLiked ? "❤️" : "🤍";

  if (isLiked) {
    gsap.timeline()
      .to(heart, { scale: 1.5, duration: 0.15 })
      .to(heart, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" });
  }
});`,
      css: `.like-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #1c1e1d;
  border: 2px solid #2a2d2b;
  border-radius: 50px;
  color: #fffce1;
  font-size: 1.1rem;
  cursor: pointer;
}

.heart {
  font-size: 1.3rem;
}

.particle {
  position: absolute;
  font-size: 0.8rem;
  pointer-events: none;
}`,
    },
  },
  {
    id: "bookmark",
    name: "Bookmark Animation",
    nameKz: "Бетбелгі анимациясы",
    description: "Animated bookmark button",
    descriptionKz: "Анимациялық бетбелгі батырмасы",
    category: "micro",
    playgroundType: "hover",
    defaultText: "BOOKMARK",
    code: {
      vue: `<template>
  <button ref="btnRef" class="bookmark-btn" @click="toggleBookmark">
    <svg ref="svgRef" viewBox="0 0 24 24" :class="{ active: isBookmarked }">
      <path ref="pathRef" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  </button>
</template>

<script setup>
import { ref } from "vue";
import gsap from "gsap";

const btnRef = ref(null);
const svgRef = ref(null);
const pathRef = ref(null);
const isBookmarked = ref(false);

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value;

  if (isBookmarked.value) {
    gsap.timeline()
      .to(svgRef.value, { y: -5, duration: 0.1 })
      .to(svgRef.value, { y: 0, duration: 0.3, ease: "bounce.out" })
      .to(pathRef.value, { fill: "#0ae448", duration: 0.2 }, 0);
  } else {
    gsap.to(pathRef.value, { fill: "transparent", duration: 0.2 });
    gsap.to(svgRef.value, { scale: 0.9, duration: 0.1 });
    gsap.to(svgRef.value, { scale: 1, duration: 0.2, delay: 0.1 });
  }
};
</script>`,
      script: `const btn = document.querySelector(".bookmark-btn");
const svg = btn.querySelector("svg");
const path = btn.querySelector("path");
let isBookmarked = false;

btn.addEventListener("click", () => {
  isBookmarked = !isBookmarked;

  if (isBookmarked) {
    gsap.timeline()
      .to(svg, { y: -5, duration: 0.1 })
      .to(svg, { y: 0, duration: 0.3, ease: "bounce.out" })
      .to(path, { fill: "#0ae448", duration: 0.2 }, 0);
  } else {
    gsap.to(path, { fill: "transparent", duration: 0.2 });
  }
});`,
      css: `.bookmark-btn {
  padding: 0.75rem;
  background: #1c1e1d;
  border: 2px solid #2a2d2b;
  border-radius: 8px;
  cursor: pointer;
}

.bookmark-btn svg {
  width: 28px;
  height: 28px;
  stroke: #0ae448;
  stroke-width: 2;
  fill: transparent;
}

.bookmark-btn svg.active path {
  fill: #0ae448;
}`,
    },
  },
];
