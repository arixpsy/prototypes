import AddCounterModal from "./AddCounterModal/AddCounterModal.svelte";
import Button from "./Button/Button.svelte";
import CounterTile from "./CounterTile/CounterTile.svelte";
import Modal from "./Modal/Modal.svelte";
import TextInput from "@/lib/components/TextInput/TextInput.svelte";
import RadioInput from "@/lib/components/RadioInput/RadioInput.svelte";
import SwitchInput from "@/lib/components/SwitchInput/SwitchInput.svelte";
import NumberInput from "@/lib/components/NumberInput/NumberInput.svelte";
import ColorRadioInput from "@/lib/components/ColorRadioInput/ColorRadioInput.svelte";
import IncrementInput from "@/lib/components/IncrementInput/IncrementInput.svelte";
import IncrementPreviewTile from "@/lib/components/IncrementPreviewTile/IncrementPreviewTile.svelte";
import CustomIncrementModal from "@/lib/components/CustomIncrementModal/CustomIncrementModal.svelte";
import CustomLabelInput from "@/lib/components/CustomLabelInput/CustomLabelInput.svelte";
import NavigationBurger from "@/lib/components/NavigationBurger/NavigationBurger.svelte";
import FormItem from "@/lib/components/FormItem/FormItem.svelte";

import Burger from "@/lib/components/Icons/Burger.svelte";
import Cross from "@/lib/components/Icons/Cross.svelte";
import Minus from "@/lib/components/Icons/Minus.svelte";
import Plus from "@/lib/components/Icons/Plus.svelte";
import ChevronRight from "@/lib/components/Icons/ChevronRight.svelte";
import Pencil from "@/lib/components/Icons/Pencil.svelte";
import Calendar from "@/lib/components/Icons/Calendar.svelte";

const Icon = {
  Burger,
  Cross,
  Plus,
  Minus,
  ChevronRight,
  Calendar,
  Pencil,
};

export {
  AddCounterModal,
  Button,
  CounterTile,
  Modal,
  TextInput,
  RadioInput,
  SwitchInput,
  NumberInput,
  ColorRadioInput,
  IncrementInput,
  IncrementPreviewTile,
  CustomIncrementModal,
  CustomLabelInput,
  NavigationBurger,
  Icon,
  FormItem,
};
