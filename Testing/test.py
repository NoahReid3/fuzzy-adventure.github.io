from tkinter import *

BG_COLOR = "#0f2f54"
DISPLAY_BG = "#102b4a"
DISPLAY_TEXT = "#e6f0ff"
BUTTON_SHADOW = "#071a32"
BUTTON_LAYER_BG = "#12365c"
BUTTON_CANVAS_BG = BG_COLOR
BUTTON_FACE = "#d6e5fb"
BUTTON_FACE_ACTIVE = "#bcd1ef"
BUTTON_OUTLINE = "#88aeda"
BUTTON_TEXT = "#08203c"

window = Tk()
window.geometry("420x640")
window.title("Calculator")
window.configure(background=BG_COLOR)

current_expression = ""
display_var = StringVar(value="0")

display_label = Label(
    window,
    textvariable=display_var,
    font=("Helvetica", 32, "bold"),
    bg=DISPLAY_BG,
    fg=DISPLAY_TEXT,
    anchor="e",
    padx=20,
    pady=30,
)
display_label.pack(fill=X)


def reset_if_error():
    global current_expression
    if display_var.get() == "Error":
        current_expression = ""
        display_var.set("0")


def update_display():
    display_var.set(current_expression if current_expression else "0")


def append_digit(digit):
    global current_expression
    reset_if_error()

    if not current_expression or current_expression == "0":
        current_expression = digit
    else:
        current_expression += digit

    update_display()


def append_operator(operator):
    global current_expression
    reset_if_error()

    if not current_expression:
        if operator == "-":
            current_expression = "-"
            display_var.set(current_expression)
        return

    if current_expression[-1] in "+-X":
        current_expression = current_expression[:-1] + operator
    else:
        current_expression += operator

    update_display()


def delete_last():
    global current_expression
    reset_if_error()
    
    if current_expression:
        current_expression = current_expression[:-1]
        update_display()


def clear_all():
    global current_expression
    current_expression = ""
    display_var.set("0")


def square_current():
    global current_expression
    reset_if_error()

    if not current_expression:
        return

    expression = current_expression
    while expression and expression[-1] in "+-X":
        expression = expression[:-1]

    if not expression or expression in "+-":
        return

    safe_expression = expression.replace("X", "*")

    try:
        value = eval(safe_expression)
        result = value * value
    except Exception:
        display_var.set("Error")
        current_expression = ""
        return

    if isinstance(result, float) and result.is_integer():
        result = int(result)

    current_expression = str(result)
    display_var.set(current_expression)


def calculate_result():
    global current_expression
    if not current_expression:
        return

    expression = current_expression
    while expression and expression[-1] in "+-X":
        expression = expression[:-1]

    if not expression or expression in "+-":
        return

    safe_expression = expression.replace("X", "*")

    try:
        result = eval(safe_expression)
    except Exception:
        display_var.set("Error")
        current_expression = ""
        return

    if isinstance(result, float) and result.is_integer():
        result = int(result)

    current_expression = str(result)
    display_var.set(current_expression)


def create_circle_button(parent, label, command=None):
    diameter = 60

    shadow_layer = Frame(parent, bg=BUTTON_SHADOW)
    button_layer = Frame(shadow_layer, bg=BUTTON_LAYER_BG, padx=6, pady=6)
    button_layer.pack(padx=4, pady=4)

    circle_canvas = Canvas(
        button_layer,
        width=diameter,
        height=diameter,
        bg=BUTTON_CANVAS_BG,
        highlightthickness=0,
        cursor="hand2",
    )
    circle_canvas.pack()

    oval_id = circle_canvas.create_oval(
        3,
        3,
        diameter - 3,
        diameter - 3,
        fill=BUTTON_FACE,
        outline=BUTTON_OUTLINE,
        width=2,
    )
    text_id = circle_canvas.create_text(
        diameter / 2,
        diameter / 2,
        text=str(label),
        fill=BUTTON_TEXT,
        font=("Helvetica", 12, "bold"),
    )

    pressed_state = {"active": False}

    def depress(_):
        if pressed_state["active"]:
            return
        pressed_state["active"] = True
        circle_canvas.itemconfig(oval_id, fill=BUTTON_FACE_ACTIVE)
        circle_canvas.move(oval_id, 1, 1)
        circle_canvas.move(text_id, 1, 1)

    def release(_):
        if not pressed_state["active"]:
            return
        pressed_state["active"] = False
        circle_canvas.itemconfig(oval_id, fill=BUTTON_FACE)
        circle_canvas.move(oval_id, -1, -1)
        circle_canvas.move(text_id, -1, -1)
        if command is not None:
            command()

    circle_canvas.bind("<ButtonPress-1>", depress)
    circle_canvas.bind("<ButtonRelease-1>", release)

    return shadow_layer


button_column = Frame(window, bg=BG_COLOR)
button_column.place(x=30, rely=1.0, anchor="sw", y=-20)

layout = [
    ["AC", None, None, "÷"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    ["x^2", 0, "DEL", "="],
]


def button_command(value):
    if isinstance(value, int):
        digit = str(value)
        return lambda d=digit: append_digit(d)

    if value == "X":
        return lambda: append_operator("X")

    if value == "÷":
        return lambda: append_operator("/")

    if value == "+":
        return lambda: append_operator("+")

    if value == "-":
        return lambda: append_operator("-")

    if value == "=":
        return calculate_result

    if value == "DEL":
        return delete_last

    if value == "x^2":
        return square_current

    if value == "AC":
        return clear_all

    return None


for row_index, row in enumerate(layout):
    for col_index, value in enumerate(row):
        if value is None:
            continue

        cmd = button_command(value)
        button = create_circle_button(button_column, label=value, command=cmd)
        button.grid(row=row_index, column=col_index, padx=6, pady=6)


def handle_keypress(event):
    key = event.char

    if key.isdigit():
        append_digit(key)
        return

    if key in "+-":
        append_operator(key)
        return

    if key in ("x", "X", "*"):
        append_operator("X")
        return

    if key in ("/", "÷"):
        append_operator("/")
        return

    if key == ".":
        append_digit(".")
        return

    if key == "=" or event.keysym in ("Return", "KP_Enter"):
        calculate_result()
        return

    if event.keysym == "BackSpace":
        delete_last()
        return

    if event.keysym in ("Escape", "Delete"):
        clear_all()
        return


window.bind("<Key>", handle_keypress)
window.mainloop()