conn.ev.on("call", async (json) => {
    for (let id of json) {
        if (id.status === "offer") {
            let msg = await conn.sendMessage(id.from, { text: "`لقد تم حظر من البوت لأنك قمت بالاتصال به لتواصل مع المطور`\n\n wa.me/+212614932692" });

            conn.sendContact(id.from, global.owner, msg);
            await conn.rejectCall(id.id, id.from);

            // Block the user
            await conn.updateBlockStatus(id.from, 'block');
        }
    }
});
