let currentChatCreated = false;
let chats = {};
let currentChatId = null;
let currentTitle = null;

async function sendMessage() {
    let input = document.getElementById("messageInput");

    let text = input.value.trim();

    if (text === "") return;

    let box = document.getElementById("chatDisplay");

    /* create chat once */

    if (!currentChatCreated) {
        addHistory(text);

        currentChatCreated = true;
    }

    /* save message */

    if (currentChatId !== null) {
        chats[currentChatId].push(text);
    }

    /* create message */

    let msg = document.createElement("div");

    msg.classList.add("message", "user");

    msg.innerText = text;

    box.appendChild(msg);

    /* ui updates */

    document.querySelector(".heading").style.display = "none";

    document.querySelector(".input-area").classList.add("bottom");

    input.value = "";

    box.scrollTop = box.scrollHeight;



    /* final response */
    setTimeout(async () => {

        let reply = document.createElement("div");
        reply.classList.add("message", "bot-msg", "typing-indicator");
        reply.id = "temp-buffering";

        reply.innerHTML = `
    <div class="dots">
        <span></span>
        <span></span>
        <span></span>
    </div>
    `;

        box.appendChild(reply);
        box.scrollTop = box.scrollHeight;

        try {

            let modelResponse =
                await getBotResponse(text);

            let bufferingDiv =
                document.getElementById("temp-buffering");

            if (bufferingDiv) {
                bufferingDiv.remove();
            }

            let finalReply =
                document.createElement("div");

            finalReply.classList.add(
                "message",
                "bot-msg"
            );

            box.appendChild(finalReply);

            const responseText =
                typeof modelResponse === "object"
                    ? JSON.stringify(modelResponse, null, 2)
                    : modelResponse;

            let displayedText = "";

            for (let i = 0; i < responseText.length; i++) {

                displayedText += responseText[i];

            finalReply.innerHTML =displayedText.replace(/\n/g, "<br>");
                box.scrollTop = box.scrollHeight;
                finalReply.style.whiteSpace = "pre-wrap";

                await new Promise(resolve =>
                    setTimeout(resolve, 10)
                );
            }

        }
        catch (error) {

            console.error("FULL ERROR:", error);

            document
                .getElementById("temp-buffering")
                ?.remove();

            let errorMsg =
                document.createElement("div");

            errorMsg.classList.add(
                "message",
                "bot-msg"
            );

            errorMsg.innerText =
                "Server Error: " + error.message;

            box.appendChild(errorMsg);
        }

    }, 400);

}




async function getBotResponse(input) {

    let response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: input
        })
    });

    let data = await response.json();

    return data.reply;
}












function addHistory(text) {
    let history = document.getElementById("history");

    let chatId = Date.now();

    currentChatId = chatId;

    chats[chatId] = [];

    let item = document.createElement("div");

    item.className = "chat-item";

    let title = document.createElement("span");

    title.innerText = text.substring(0, 25);

    /* three dots */

    let del = document.createElement("button");

    del.className = "delete-btn";

    del.innerHTML = "⋮";

    /* menu */

    let menu = document.createElement("div");

    menu.className = "menu";

    menu.innerHTML = `


<div class="rename-chat">
Rename
</div>
    
<div class="delete-chat">
Delete
</div>



`;

    /* open menu */

    del.onclick = (e) => {
        e.stopPropagation();

        document.querySelectorAll(".menu").forEach((m) => {
            m.style.display = "none";
        });

        menu.style.display = "block";
    };

    /* delete */

    menu.querySelector(".delete-chat").onclick = (e) => {
        e.stopPropagation();

        item.remove();

        delete chats[chatId];

        document.getElementById("chatDisplay").innerHTML = "";

        document.querySelector(".heading").style.display = "block";

        document.querySelector(".input-area").classList.remove("bottom");

        currentChatCreated = false;
    };

    /* rename */

    menu.querySelector(".rename-chat").onclick = (e) => {
        e.stopPropagation();

        currentTitle = title;

        document.getElementById("renameInput").value = title.innerText;

        document.getElementById("renameModal").style.display = "flex";

        menu.style.display = "none";
    };

    /* open chat */

    item.onclick = () => {
        let box = document.getElementById("chatDisplay");

        box.innerHTML = "";

        document.querySelector(".heading").style.display = "none";

        document.querySelector(".input-area").classList.add("bottom");

        currentChatId = chatId;

        chats[chatId].forEach((text) => {
            let msg = document.createElement("div");

            msg.classList.add("message", "user");

            msg.innerText = text;

            box.appendChild(msg);
        });
    };

    item.appendChild(title);

    item.appendChild(del);

    item.appendChild(menu);

    history.prepend(item);
}

/* new chat */

function newChat() {
    document.getElementById("chatDisplay").innerHTML = "";

    document.querySelector(".heading").style.display = "block";

    document.querySelector(".input-area").classList.remove("bottom");

    currentChatCreated = false;

    currentChatId = null;
}

/* enter key */

document.getElementById("messageInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

/* save rename */

document.getElementById("saveRename").onclick = () => {
    let value = document.getElementById("renameInput").value.trim();

    if (value !== "" && currentTitle) {
        currentTitle.innerText = value.substring(0, 25);
    }

    document.getElementById("renameModal").style.display = "none";
};

/* cancel rename */

document.getElementById("cancelRename").onclick = () => {
    document.getElementById("renameModal").style.display = "none";
};

/* close menu outside click */

document.onclick = () => {
    document.querySelectorAll(".menu").forEach((menu) => {
        menu.style.display = "none";
    });
};













function previewImage(event) {
    const input = event.target;
    const container = document.getElementById('previewContainer');
    const preview = document.getElementById('imagePreview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.src = e.target.result;
            container.style.display = 'block'; // Make the badge visible
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

function clearImage(event) {
    event.stopPropagation(); // Stop click from triggering other elements
    const input = document.getElementById('imageInput');
    const container = document.getElementById('previewContainer');
    const preview = document.getElementById('imagePreview');
    
    input.value = ''; // Reset input file
    preview.src = '';
    container.style.display = 'none'; // Hide container
}