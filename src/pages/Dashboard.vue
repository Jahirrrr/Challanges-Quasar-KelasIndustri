<template>
  <q-page class="row items-top justify-end">
    <!-- Add Dialog -->
    <q-dialog v-model="dialogAddNotes">
      <q-card class="q-pa-md" style="width: 700px; max-width: 80vw">
        <div class="text-weight-medium text-center" style="font-size: 30px">
          {{ editingNote.value ? $t('editNote') : $t('addNote') }}
        </div>

        <div class="row q-mt-xl">
          <div class="col-12 col-sm-6 col-md q-px-lg q-gutter-md">
            <div>
              <div>{{ $t('notesLabel') }}</div>
              <q-input
                dense
                color="indigo"
                outlined
                v-model="input.notes"
                lazy-rules
                :rules="[(val) => val !== '' || $t('notesNotEmpty')]"
              >
                <template v-if="input.notes" v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop.prevent="input.notes = null"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
            <div>
              <div>{{ $t('createdByLabel') }}</div>
              <q-input
                dense
                color="indigo"
                outlined
                v-model="input.created_by"
                lazy-rules
                :rules="[(val) => val !== '' || $t('createdByNotEmpty')]"
              >
                <template v-if="input.created_by" v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop.prevent="input.created_by = null"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <div class="" style="margin-top: 20px">
          <q-btn
            class="full-width text-capitalize"
            :color="editingNote.value ? 'purple' : 'indigo-7'"
            :label="editingNote.value ? $t('editNote') : $t('addNote')"
            @click="editingNote.value ? editNote() : addNotes()"
          />
        </div>
      </q-card>
    </q-dialog>

    <!-- Edit Dialog -->
    <q-dialog v-model="dialogEditNote">
      <q-card class="q-pa-md" style="width: 700px; max-width: 80vw">
        <div class="text-weight-medium text-center" style="font-size: 30px">
          {{ $t('editNote') }}
        </div>

        <div class="row q-mt-xl">
          <div class="col-12 col-sm-6 col-md q-px-lg q-gutter-md">
            <div>
              <div>{{ $t('notesLabel') }}</div>
              <q-input
                dense
                color="indigo"
                outlined
                v-model="input.notes"
                lazy-rules
                :rules="[(val) => val !== '' || $t('notesNotEmpty')]"
              >
                <template v-if="input.notes" v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop.prevent="input.notes = null"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
            <div>
              <div>{{ $t('createdByLabel') }}</div>
              <q-input
                dense
                color="indigo"
                outlined
                v-model="input.created_by"
                lazy-rules
                :rules="[(val) => val !== '' || $t('createdByNotEmpty')]"
              >
                <template v-if="input.created_by" v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop.prevent="input.created_by = null"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <div class="" style="margin-top: 20px">
          <q-btn
            class="full-width text-capitalize"
            color="purple"
            :label="$t('editNote')"
            @click="editNote()"
          />
        </div>
      </q-card>
    </q-dialog>

    <!-- Delete Dialog -->
    <q-dialog v-model="dialogDeleteNote">
      <q-card class="q-pa-md" style="width: 700px; max-width: 80vw">
        <div class="text-weight-medium text-center" style="font-size: 30px">
          {{ $t('deleteNote') }}
        </div>

        <div class="row q-mt-xl">
          <div class="col q-px-lg">
            <div>
              <p>
                {{ $t('confirmDeleteNote') }}: <strong>{{ input.notes }}</strong>?
              </p>
            </div>
          </div>
        </div>
        <div class="" style="margin-top: 20px">
          <q-btn
            class="full-width text-capitalize"
            color="negative"
            :label="$t('deleteNote')"
            @click="deleteNote()"
          />
        </div>
      </q-card>
    </q-dialog>

    <!-- Main Content -->
    <div class="col justify-end">
      <div class="row q-pa-lg justify-start q-gutter-lg">
        <q-table :rows="rows" :columns="columns" row-key="no" style="width: 100%;">
          <template v-slot:top>
            <div class="fit row justify-end q-gutter-sm">
              <q-btn
                @click="openAddDialog(false)"
                color="primary"
                icon="add"
                :label="$t('addNotes')"
                class="items-end"
              />
            </div>
          </template>

          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                auto-width
                class="wrap justify-center items-center"
              >
                {{ $t(`columns.${col.name}`) }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td class="text-center">{{ props.rowIndex + 1 }}</q-td>
              <q-td class="text-center">{{ props.row.notes }}</q-td>
              <q-td class="text-center">{{ props.row.created_at }}</q-td>
              <q-td class="text-center">{{ props.row.created_by }}</q-td>
              <q-td class="text-center">{{ props.row.status }}</q-td>
              <q-td class="text-center">
                <q-btn
                  @click="openEditDialog(props.row)"
                  color="primary"
                  icon="edit"
                  class="items-end"
                >
                  <q-tooltip class="bg-indigo" :offset="[10, 10]">
                    {{ $t('editNote') }}
                  </q-tooltip>
                </q-btn>
                <q-btn
                  @click="openDeleteDialog(props.row)"
                  color="negative"
                  icon="delete"
                  class="items-end"
                >
                  <q-tooltip class="bg-indigo" :offset="[10, 10]">
                    {{ $t('deleteNote') }}
                  </q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { date } from 'quasar';
import { uid } from 'quasar';

const timeStamp = Date.now();

const columns = [
  {
    name: 'no',
    field: 'no',
    label: 'No',
    align: 'center',
  },
  { name: 'notes', label: 'Notes', field: 'notes', align: 'center' },
  { name: 'created_at', label: 'Created At', field: 'created_at', align: 'center' },
  { name: 'created_by', label: 'Created By', field: 'created_by', align: 'center' },
  { name: 'status', label: 'Notes Status', field: 'status', align: 'center' },
  { name: 'action', label: 'Action', field: 'action', align: 'center' },
];

export default defineComponent({
  name: 'DashboardTodo',
  setup() {
    const rows = ref([
      {
        no: uid(),
        notes: 'Test',
        created_at: '2023-11-14',
        created_by: 'Deni Rudiana',
        status: 'Success',
      },
    ]);

    const dialogAddNotes = ref(false);
    const dialogEditNote = ref(false);
    const dialogDeleteNote = ref(false);

    const input = ref({
      notes: '',
      created_by: '',
    });

    const editingNote = ref(false);
    const editingNoteIndex = ref(-1);

    const openAddDialog = (edit) => {
      dialogAddNotes.value = true;
      editingNote.value = edit;
    };

    const openEditDialog = (note) => {
      input.value.notes = note.notes;
      input.value.created_by = note.created_by;
      editingNoteIndex.value = rows.value.findIndex((x) => x.no === note.no);
      dialogEditNote.value = true;
    };

    const openDeleteDialog = (note) => {
      input.value.notes = note.notes;
      input.value.created_by = note.created_by;
      editingNoteIndex.value = rows.value.findIndex((x) => x.no === note.no);
      dialogDeleteNote.value = true;
    };

    const addNotes = () => {
      rows.value.push({
        no: uid(),
        notes: input.value.notes,
        created_at: date.formatDate(timeStamp, 'YYYY-MM-DD'),
        created_by: input.value.created_by,
        status: 'Success',
      });
      dialogAddNotes.value = false;
    };

    const editNote = () => {
      if (editingNoteIndex.value !== -1) {
        rows.value[editingNoteIndex.value].notes = input.value.notes;
        rows.value[editingNoteIndex.value].created_by = input.value.created_by;
        dialogEditNote.value = false;
      }
    };

    const deleteNote = () => {
      if (editingNoteIndex.value !== -1) {
        rows.value.splice(editingNoteIndex.value, 1);
        dialogDeleteNote.value = false;
      }
    };

    return {
      columns,
      rows,
      dialogAddNotes,
      dialogEditNote,
      dialogDeleteNote,
      input,
      editingNote,
      editingNoteIndex,
      openAddDialog,
      openEditDialog,
      openDeleteDialog,
      addNotes,
      editNote,
      deleteNote,
    };
  },
});
</script>

<style scoped>
/* tambahkan styling sesuai kebutuhan */
</style>
