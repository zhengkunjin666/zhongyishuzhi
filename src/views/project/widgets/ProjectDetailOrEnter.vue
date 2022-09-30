<template>
  <a-modal
    v-model:visible="modalVisible"
    :title="title"
    centered
    @cancel="handleResetForm()"
    :width="1000"
    :footer="null"
  >
    <a-form
      ref="formRef"
      name="basic"
      :model="data.formState"
      :rules="rules"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      :hideRequiredMark="hideRequiredMark"
      @finish="handleSubmit"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="项目名称"
            name="name"
          >
            <a-input v-model:value="data.formState.name" :disabled="disabled" :title="data.formState.name" />
          </a-form-item>
          <a-form-item
            label="参与人数"
            name="expert_number"
          >
            <a-input v-model:value="data.formState.expert_number" :disabled="disabled" />
          </a-form-item>
          <a-form-item
            label="启动日期"
            name="begin_date"
          >
            <a-input v-model:value="data.formState.begin_date" :disabled="disabled" />
          </a-form-item>
          <a-form-item
            label="项目状态"
            name="status_desc"
          >
            <a-input v-model:value="data.formState.status_desc" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="行业"
            name="industry"
          >
            <a-input v-model:value="data.formState.industry" :disabled="disabled" />
          </a-form-item>
          <a-form-item
            label="产品领域"
            name="domain"
          >
            <a-input v-model:value="data.formState.domain" :disabled="disabled" />
          </a-form-item>
          <a-form-item
            label="项目周期"
            name="period"
          >
            <a-input v-if="id" :value="data.formState.period + '周'" :disabled="disabled" />
            <a-input v-else v-model:value="data.formState.period" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item v-if="!id" :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit">提交</a-button>
        <a-button style="margin-left: 10px" @click="handleResetForm">重置</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, computed, reactive, onUpdated } from "vue";
import Projects from "@/global/service/projects.js";

const title = ref("");
const emits = defineEmits(["update:visible", "update:id"]);
const props = defineProps({
  visible: Boolean,
  id: String,
});
const modalVisible = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emits("update:visible", value);
  },
});
const id = computed({
  get() {
    return props.id;
  },
  set(value) {
    emits("update:id", value);
  },
});
const formRef = ref();
const hideRequiredMark = ref(false);
const disabled = ref(false);
const data = reactive({
  formState: {}
});
const rules = {
  name: { required: true, message: '请输入项目名称', trigger: 'change', },
  expert_number: { required: true, message: '请输入参与人数', trigger: 'change', },
  begin_date: { required: true, message: '请输入启动日期', trigger: 'change', },
  status_desc: { required: true, message: '请输入项目状态', trigger: 'change', },
  industry: { required: true, message: '请输入行业', trigger: 'change', },
  domain: { required: true, message: '请输入产品领域', trigger: 'change', },
  period: { required: true, message: '请输入项目周期', trigger: 'change', },
};
onUpdated(() => {
  if (id.value) {
    title.value = "项目详情";
    Projects.getProjectDetail(id.value).then((res) => {
      console.log(res)
      data.formState = res.data;
      hideRequiredMark.value = true;
      disabled.value = true;
    })
  } else {
    title.value = "项目录入";
    hideRequiredMark.value = false;
    disabled.value = false;
  }
});
const handleResetForm = () => {
  id.value = null;
  formRef.value.resetFields();
};
const handleSubmit = (values) => {
  console.log(values, data.formState)
  Projects.postProject(values).then((res) => {
    console.log(res)
  })
};
</script>

<style lang="less" scoped>
// .ant-input[disabled] {
//   color: #000000;
//   background-color: #ffffff;
//   box-shadow: none;
//   cursor: auto;
//   opacity: 1;
//   border: none;
//   white-space: nowrap; 
//   text-overflow:ellipsis;
//   overflow:hidden;
// }
// .ant-input[disabled]:hover {
//   border: none;
// }
</style>
