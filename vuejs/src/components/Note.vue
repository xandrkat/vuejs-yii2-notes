<template>
    <div class="tc-note">
        <div class="tc-note-header">
                <span @click="deleteNote" class="tc-note-close">
                    &times;
                </span>
        </div>
        <div @blur="titleChanged" class="tc-note-title" contenteditable>
            {{note.title}}
        </div>
        <div @blur="bodyChanged" class="tc-note-body" contenteditable>
            {{note.body}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Note",
        props: {
            note: {
                type: Object,
                required: true
            }
        },
        methods: {
            titleChanged($event) {
                this.note.title = $event.target.innerHTML;
                this.$emit('noteUpdate', this.note);
            },
            bodyChanged($event) {
                this.note.body = $event.target.innerHTML;
                this.$emit('noteUpdate', this.note);
            },
            deleteNote() {
                this.$emit('deleteNote', this.note)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .tc-note {
        background-color: #f0c806;
        border-radius: 8px;
        width: 280px;
        margin: 0 10px 20px;
        box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
        transition: all 0.5s;
        cursor: pointer;
        font-family: 'Caveat', cursive;

        .tc-note-header {
            padding: 10px 16px 0;

            .tc-note-close {
                display: flex;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                justify-content: center;
                align-items: center;
                transition: all 0.3s;
                font-size: 30px;

                &:hover {
                    background-color: rgba(0, 0, 0, 0.2);
                }

                &:focus {
                    box-shadow: inset 2px 3px 0px rgba(0, 0, 0, 0.8);
                }
            }

            .tc-note-close {
                float: right;
            }
        }

        .tc-note-title,
        .tc-note-body {
            outline: 0;
        }

        .tc-note-title {
            font-size: 24px;
            padding: 10px 16px;
            font-weight: bold;
        }

        .tc-note-body {
            font-size: 20px;
            padding: 10px 16px 16px;
        }

        &:hover {
            box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
        }
    }
</style>
