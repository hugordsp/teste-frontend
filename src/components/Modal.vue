<script>
export default {
    name: 'Modal',
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>

<template>
    <transition name="sc-modal-fade">
        <div class="sc-modal-backdrop">
            <div class="sc-modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <header class="sc-modal-header" id="modalTitle">
                    <slot name="header">
                        This is the default tile!
                    </slot>
                </header>

                <section class="sc-modal-body" id="modalDescription">
                    <form class="form">
                        <div class="form-group">
                            <label for="projectName">Project Name</label>
                            <input type="text" class="form-control" id="projectName" aria-describedby="projectName">
                        </div>
                        <div class="form-group">
                            <label for="startDate">Start Date</label>
                            <input type="text" class="form-control" id="startDate">
                        </div>
                        <div class="form-group">
                            <label for="endDate">End Date</label>
                            <input type="text" class="form-control" id="endDate">
                        </div>
                        <div class="form-group">
                            <label for="value">Value</label>
                            <input type="text" class="form-control" id="value">
                        </div>
                        <div class="form-group">
                            <label for="status">Status</label>
                            <select name="status" class="form-control" id="status">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </form>
                </section>

                <footer class="sc-modal-footer">
                    <slot name="footer">
                        This is the default tile!
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<style>
.sc-modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.3) !important;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sc-modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    min-width: 40vw;
    flex-direction: column;
}

.sc-modal-header,
.sc-modal-footer {
    padding: 15px;
    display: flex;
}

.sc-modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
}

.sc-modal-footer {
    border-top: 1px solid #eeeeee;
    gap: 10px;
    justify-content: end;
}

.sc-modal-body {
    position: relative;
    padding: 20px 10px;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
}

.btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
}

.sc-modal-fade-enter,
.sc-modal-fade-leave-to {
    opacity: 0;
}

.sc-modal-fade-enter-active,
.sc-modal-fade-leave-active {
    transition: opacity .5s ease;
}
</style>