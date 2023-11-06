"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form = require("./attributes/form/form.json");
const formItem = require("./attributes/form/formItem.json");
const button = require("./attributes/button/button.json");
const row = require("./attributes/grid/row.json");
const col = require("./attributes/grid/col.json");
const layout = require("./attributes/layout/layout.json");
const layoutSider = require("./attributes/layout/layoutSider.json");
const affix = require("./attributes/affix/affix.json");
const breadcrumb = require("./attributes/breadcrumb/breadcrumb.json");
const dropdown = require("./attributes/dropdown/dropdown.json");
const dropdownButton = require("./attributes/dropdown/dropdownButton.json");
const menu = require("./attributes/menu/menu.json");
const menuItem = require("./attributes/menu/menuItem.json");
const menuSub = require("./attributes/menu/menuSub.json");
const pagination = require("./attributes/pagination/pagination.json");
const steps = require("./attributes/steps/steps.json");
const step = require("./attributes/steps/step.json");
const autoComplete = require("./attributes/autoComplete/autoComplete.json");
const cascader = require("./attributes/cascader/cascader.json");
const checkbox = require("./attributes/checkbox/checkbox.json");
const checkboxGroup = require("./attributes/checkbox/checkboxGroup.json");
const datePicker = require("./attributes/date-picker/date.json");
const monthPicker = require("./attributes/date-picker/month.json");
const rangePicker = require("./attributes/date-picker/range.json");
const weekPicker = require("./attributes/date-picker/week.json");
const inputGroup = require("./attributes/input/group.json");
const input = require("./attributes/input/input.json");
const inputTextArea = require("./attributes/input/textarea.json");
const inputNumber = require("./attributes/inputNumber/number.json");
const radio = require("./attributes/radio/radio.json");
const radioGroup = require("./attributes/radio/radioGroup.json");
const rate = require("./attributes/rate/rate.json");
const select = require("./attributes/select/select.json");
const selectOption = require("./attributes/select/selectOption.json");
const slider = require("./attributes/slider/slider.json");
const switchJson = require("./attributes/switch/switch.json");
const timePicker = require("./attributes/timePicker/timePicker.json");
const transfer = require("./attributes/transfer/transfer.json");
const treeSelect = require("./attributes/treeSelect/treeSelect.json");
const treeSelectNode = require("./attributes/treeSelect/treeSelectNode.json");
const upload = require("./attributes/upload/upload.json");
const avatar = require("./attributes/avatar/avatar.json");
const badge = require("./attributes/badge/badge.json");
const calendar = require("./attributes/calendar/calendar.json");
const card = require("./attributes/card/card.json");
const cardMeta = require("./attributes/card/cardMeta.json");
const carousel = require("./attributes/carousel/carousel.json");
const collapse = require("./attributes/collapse/collapse.json");
const collapsePanel = require("./attributes/collapse/collapsePanel.json");
const list = require("./attributes/list/list.json");
const listItem = require("./attributes/list/listItem.json");
const listItemMeta = require("./attributes/list/listItemMeta.json");
const popover = require("./attributes/popover/popover.json");
const tooltip = require("./attributes/tooltip/tooltip.json");
const table = require("./attributes/table/table.json");
const tabs = require("./attributes/tabs/tabs.json");
const tabPane = require("./attributes/tabs/tabpane.json");
const tag = require("./attributes/tag/tag.json");
const checkableTag = require("./attributes/tag/checkableTag.json");
const timeline = require("./attributes/timeline/timeline.json");
const timelineItem = require("./attributes/timeline/timelineItem.json");
const tree = require("./attributes/tree/tree.json");
const treeNode = require("./attributes/tree/treeNode.json");
const alert = require("./attributes/alert/alert.json");
const drawer = require("./attributes/drawer/drawer.json");
const popconfirm = require("./attributes/popconfirm/popconfirm.json");
const progress = require("./attributes/progress/progress.json");
const skeleton = require("./attributes/skeleton/skeleton.json");
const spin = require("./attributes/spin/spin.json");
const anchor = require("./attributes/anchor/anchor.json");
const backtop = require("./attributes/backtop/backtop.json");
const divider = require("./attributes/divider/divider.json");
const comment = require("./attributes/comment/comment.json");
exports.default = Object.assign({}, form, formItem, button, row, col, layout, layoutSider, affix, breadcrumb, dropdownButton, dropdown, menu, menuItem, menuSub, pagination, steps, step, autoComplete, cascader, checkbox, checkboxGroup, datePicker, monthPicker, rangePicker, weekPicker, input, inputGroup, inputTextArea, inputNumber, radio, radioGroup, rate, select, selectOption, slider, switchJson, timePicker, transfer, treeSelect, treeSelectNode, upload, avatar, badge, calendar, card, cardMeta, carousel, collapse, collapsePanel, list, listItem, listItemMeta, popover, tooltip, table, tabs, tabPane, tag, checkableTag, timeline, timelineItem, tree, treeNode, alert, drawer, popconfirm, progress, skeleton, spin, anchor, backtop, divider, {
    "a-locale-provider/locale": {
        "description": "language package setting, you can find the packages in this path: antd/lib/locale-provider/",
        "optionType": "object",
        "defaultValue": "-"
    }
}, {
    "a-config-provider/getPopupContainer": {
        "description": "to set the container of the popup element. The default is to create a div element in body.",
        "optionType": "Function(triggerNode)",
        "defaultValue": "() => document.body"
    }
}, comment);
//# sourceMappingURL=ui-attributes.js.map