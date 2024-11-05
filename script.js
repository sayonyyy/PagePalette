document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-input').value;
        searchBooks(query);
    }
});

document.getElementById('home-button').addEventListener('click', function() {
    document.getElementById('results').style.display = 'none';
    document.getElementById('home-interface').style.display = 'block';
});

function searchBooks(query) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(books) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '<button id="home-button" class="home-button">Home</button>';

    if (!books) {
        resultsContainer.innerHTML += '<p>No results found.</p>';
        return;
    }

    books.forEach(book => {
        const bookInfo = book.volumeInfo;
        const title = bookInfo.title || 'No title available';
        const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'No authors available';
        const description = bookInfo.description || 'No description available';
        const thumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : '';

        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        bookElement.innerHTML = `
            <h2>${title}</h2>
            <p><strong>Authors:</strong> ${authors}</p>
            <p>${description}</p>
            ${thumbnail ? `<img src="${thumbnail}" alt="${title}">` : ''}
        `;

        resultsContainer.appendChild(bookElement);
    });

    // Show the results section and hide the home interface
    resultsContainer.style.display = 'block';
    document.getElementById('home-interface').style.display = 'none';

    // Re-add event listener to the new home button
    document.getElementById('home-button').addEventListener('click', function() {
        document.getElementById('results').style.display = 'none';
        document.getElementById('home-interface').style.display = 'block';
    });
}

// Book details to be shown for each button
const bookDetailsContent = [
    {
        title: "A Court of Silver Flames",
        authors: "Sarah J. Maas",
        description:"THE LATEST BOOK IN THE #1 BESTSELLING SERIES 'With bits of Buffy, Game Of Thrones and Outlander, this is a glorious series of total joy' Sarah J. Maas's sexy, richly imagined series continues with the journey of Feyre's fiery sister, Nesta. Nesta Archeron has always been prickly-proud, swift to anger, and slow to forgive. And ever since being forced into the Cauldron and becoming High Fae against her will, she's struggled to find a place for herself within the strange, deadly world she inhabits. Worse, she can't seem to move past the horrors of the war with Hybern and all she lost in it.The one person who ignites her temper more than any other is Cassian, the battle-scarred warrior whose position in Rhysand and Feyre's Night Court keeps him constantly in Nesta's orbit. But her temper isn't the only thing Cassian ignites. The fire between them is undeniable, and only burns hotter as they are forced into close quarters with each other. Meanwhile, the treacherous human queens who returned to the Continent during the last war have forged a dangerous new alliance, threatening the fragile peace that has settled over the realms. And the key to halting them might very well rely on Cassian and Nesta facing their haunting pasts.Against the sweeping backdrop of a world seared by war and plagued with uncertainty, Nesta and Cassian battle monsters from within and without as they search for acceptance-and healing-in each other's arms.",
        cover: "b1.jpg"  // Replace with actual image URL
    },
    {
        title: "The Fault In Our Stars",
        authors: "John Green",
        description: "The Fault in Our Stars by John Green follows the unlikely romance of Hazel Grace Lancaster and Augustus Waters. Goodreads summarizes it like this: “Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel’s story is about to be completely rewritten. The Fault in Our Stars by John Green is a young adult fiction novel that narrates the story of a 16-year-old girl who is diagnosed with cancer. She joins a support group where she meets Augustus, and there is a rollercoaster of emotions throughout this novel as the relationship between Hazel and Augustus develops. Hazel and Augustus are able to find comfort in each other through the tough times and learn to lean into each other which makes them both realize that they are not alone. They find love in each other and feel hopeful for each other, also while allowing the readers to learn about their inner struggles.",
        cover: "b2.jpg"  // Replace with actual image URL
    },
    {
        title: "Twisted Love",
        authors: "Ana Huang",
        description: "Twisted Love is a brother's best friend/opposites attract romance with a hint of suspense. It's book one in the Twisted series but can be read as a standalone. A scintillating romance about a cold-hearted man driven by vengeance whose heart starts to melt when he is forced to look after his best friend's sister, Twisted Love is essential reading for all fans of enemies-to-lovers stories. He has a heart of ice... but for her, he'd burn the world. Alex Volkov is a devil blessed with the face of an angel and cursed with a past he can't escape. Driven by a tragedy that has haunted him for most of his life, his ruthless pursuits for success and vengeance leave little room for matters of the heart. But when he's forced to look after his best friend's sister, he starts to feel something in his chest: A crack. A melt. A fire that could end his world as he knew it.",
        cover: "b3.jpg"  // Replace with actual image URL
    },
    {
        title: "The Great Alone",
        authors: "Khristin Hannah",
        description: "Ernt Allbright, a former POW, comes home from the Vietnam war a changed and volatile man. When he loses yet another job, he makes an impulsive decision: he will move his family north, to Alaska, where they will live off the grid in America’s last true frontier.\n Thirteen-year-old Leni, a girl coming of age in a tumultuous time, caught in the riptide of her parents’ passionate, stormy relationship, dares to hope that a new land will lead to a better future for her family. She is desperate for a place to belong. Her mother, Cora, will do anything and go anywhere for the man she loves, even if means following him into the unknown. At first, Alaska seems to be the answer to their prayers. In a wild, remote corner of the state, they find a fiercely independent community of strong men and even stronger women. The long, sunlit days and the generosity of the locals make up for the Allbrights’ lack of preparation and dwindling resources. But as winter approaches and darkness descends on Alaska, Ernt’s fragile mental state deteriorates and the family begins to fracture. Soon the perils outside pale in comparison to threats from within. In their small cabin, covered in snow, blanketed in eighteen hours of night, Leni and her mother learn the terrible truth: they are on their own. In the wild, there is no one to save them but themselves. In this unforgettable portrait of human frailty and resilience, Kristin Hannah reveals the indomitable character of the modern American pioneer and the spirit of a vanishing Alaska―a place of incomparable beauty and danger. The Great Alone is a daring, beautiful, stay-up-all-night story about love and loss, the fight for survival, and the wildness that lives in both man and nature.",
        cover: "b4.jpg"  // Replace with actual image URL
    },
    {
        title: "Fourth Wing",
        authors: "Rebecca Yarrros",
        description: "REBECCA YARROS is a hopeless romantic and coffee addict. She is the New York Times bestselling author of over twenty novels, including Fourth Wing, The Last Letter and The Things We Leave Unfinished. Fourth Wing is a high fantasy novel that follows a cadet named Violet Sorrengail as she braves Basgiath War College, where the only goal is to bond with a dragon or die trying. As the daughter of a commanding general, she has an immediate target on her back. She spends 517 fast-paced pages forging friendships, navigating enemies, and flirting with a very hot fellow dragon rider, who, obviously, wants to kill her to get revenge on her mother. Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general—also known as her tough-as-talons mother—has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders. But when you’re smaller than everyone else and your body is brittle, death is only a heartbeat away...because dragons don’t bond to “fragile” humans. They incinerate them. With fewer dragons willing to bond than cadets, most would kill Violet to better their own chances of success. The rest would kill her just for being her mother’s daughter—like Xaden Riorson, the most powerful and ruthless wingleader in the Riders Quadrant. She’ll need every edge her wits can give her just to see the next sunrise. Yet, with every day that passes, the war outside grows more deadly, the kingdom's protective wards are failing, and the death toll continues to rise. Even worse, Violet begins to suspect leadership is hiding a terrible secret. Friends, enemies, lovers. Everyone at Basgiath War College has an agenda—because once you enter, there are only two ways out: graduate or die.",
        cover: "b5.jpg"  // Replace with actual image URL
    },
    {
        title: "48 Laws Of Power",
        authors: "Robert Greene",
        description: "The 48 Laws of Power by Robert Greene is a self-help book offering advice on how to gain and maintain power, using lessons drawn from parables and the experiences of historical figures. Power depends on the relationships between a person and those he or she seeks to control. In The 48 Laws of Power, Robert Greene asserts that whether you like it or not, you're part of a never-ending game of power. You're either striving for and wielding power, or you're a pawn being played by someone more powerful than you. You choose your role.",
        cover: "b6.jpg"  // Replace with actual image URL
    },
    {
        title: "The Cruel Prince",
        authors: "Holly Black",
        description: "Holly Black is the #1 New York Times bestselling author of over thirty fantasy novels for kids and teens. 'And Cardan is even more beautiful than the rest. I hate him more than all the others. I hate him so much that sometimes when I look at him, I can hardly breathe.'   Jude was seven years old when her parents were murdered and she and her two sisters were stolen away to live in the treacherous High Court of Faerie. Ten years later, Jude wants nothing more than to belong there, despite her mortality. But many of the fey despise humans. Especially Prince Cardan, the youngest and wickedest son of the High King. To win a place at the Court, she must defy him–and face the consequences. In doing so, she becomes embroiled in palace intrigues and deceptions, discovering her own capacity for bloodshed. But as civil war threatens to drown the Courts of Faerie in violence, Jude will need to risk her life in a dangerous alliance to save her sisters, and Faerie itself.",
        cover: "b7.jpg"  // Replace with actual image URL
    },
    {
        title: "The Alchemist",
        authors: "Paulo Coelho",
        description: "Paulo Coelho's enchanting novel has inspired a devoted following around the world. This story, dazzling in its powerful simplicity and inspiring wisdom, is about an Andalusian shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried in the Pyramids. Combining magic, mysticism, wisdom, and wonder into an inspiring tale of self-discovery, The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations. Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined. Santiago's journey teaches us about the essential wisdom of listening to our hearts, recognizing opportunity and learning to read the omens strewn along life's path, and, most importantly, following our dreams.",
        cover: "b8.jpg" 
    },
    {
        title: "Kafka On The Shore",
        authors: "haruki Murakami",
        description: "'Kafka On The Shore' is a 2002 novel by Japanese author Haruki Murakami. Its 2005 English translation was among “The 10 Best Books of 2005” according to The New York Times, and it also received the World Fantasy Award in 2006. Kafka on the Shore, a tour de force of metaphysical reality, is powered by two remarkable characters: a teenage boy, Kafka Tamura, who runs away from home either to escape a gruesome oedipal prophecy or to search for his long-missing mother and sister; and an aging simpleton called Nakata, who never recovered from a wartime affliction and now is drawn toward Kafka for reasons that, like the most basic activities of daily life, he cannot fathom. Their odyssey, as mysterious to them as it is to us, is enriched throughout by vivid accomplices and mesmerizing events. Cats and people carry on conversations, a ghostlike pimp employs a Hegel-quoting prostitute, a forest harbors soldiers apparently unaged since World War II, and rainstorms of fish (and worse) fall from the sky. There is a brutal murder, with the identity of both victim and perpetrator a riddle—yet this, along with everything else, is eventually answered, just as the entwined destinies of Kafka and Nakata are gradually revealed, with one escaping his fate entirely and the other given a fresh start on his own.",
        cover: "b9.jpg" 
    },
    {
        title: "Shatter Me",
        authors: "Tahereh Mafi",
        description: "Shatter Me is a young adult dystopian romantic thriller written by Tahereh Mafi, published on November 15, 2011. The book is narrated by Juliette, a 17-year-old girl with a lethal touch and is unusual in that it contains passages and lines that have been crossed out like a diary entry. With a touch that can kill, The Reestablishment see Juliette as a threat. One they can trap and use as a weapon. But when she reunites with the one person in the world who cared for her, Juliette learns that her lethal touch can soon become her greatest power. Juliette hasn't touched anyone in exactly 264 days. The last time she did, it was an accident, but The Reestablishment locked her up for murder. No one knows why Juliette's touch is fatal. As long as she doesn't hurt anyone else, no one really cares. The world is too busy crumbling to pieces to pay attention to a 17-year-old girl. Diseases are destroying the population, food is hard to find, birds don't fly anymore, and the clouds are the wrong color. The Reestablishment said their way was the only way to fix things, so they threw Juliette in a cell. Now so many people are dead that the survivors are whispering war—and The Reestablishment has changed its mind. Maybe Juliette is more than a tortured soul stuffed into a poisonous body. Maybe she's exactly what they need right now.",
        cover: "b10.jpg"
    },
    {
        title: "It Ends With Us",
        authors: "Colleen Hoover",
        description: "International and #1 New York Times bestselling author of romance, YA, thriller, women's fiction and paranormal romance. “It Ends with Us” by Colleen Hoover is a powerful and emotionally charged novel that delves into the complexities of love, resilience, and the cycle of abuse. Through the character of Lily Bloom, the author explores the difficult decisions and inner strength required to break free from an abusive relationship. A story of love, heartache, betrayal and personal decisions, It Ends With Us follows a young woman named Lily. When Lily meets Ryle, a successful surgeon, she thinks that her dreams have come true. In a life far away from her small-town upbringing, Lily knows the tides have changed in her favour. However, Lily soon discovers that Ryle isn’t the perfect man. Despite the fact that Ryle is charming and clever, he has a difficult time with relationships. This unsettles Lily and she find that her thoughts are occupied by her old love, Atlas. When Lily gets the chance to reconnect with Atlas, her new life with Ryle is under threat. What life will Lily choose?",
        cover: "b11.jpg"
    },
    {
        title: "Atomic Habits",
        authors: "James Clear",
        description: "Atomic Habits (2018) provides a practical and proven framework for creating good habits and shedding bad ones. Drawing on scientific research and real-life examples, it shows how tiny changes in behavior can result in the formation of new habits and help you achieve big things. The 4 laws of atomic habits are a simple set of rules we can use to establish new habits: 1) make it obvious, 2) make it attractive, 3) make it easy, and 4) make it satisfying. Think of these laws as a framework for designing each stage for optimal habit formation.“A habit is a behavior that has been repeated enough times to become automatic.” “The ultimate purpose of habits is to solve the problems of life with as little energy and effort as possible.” “Any habit can be broken down into a feedback loop that involves four steps: cue, craving, response, and reward.”",
        cover: "b12.jpg"
    },
    {
        title: "Harry Potter and the Order Of Pheonix",
        authors: "J.K. Rowling",
        description: "J.K. Rowling's internationally bestselling Harry Potter books continue to captivate new generations of readers. Harry's fifth adventure alongside his friends, Ron and Hermione, invites you to explore even more of the wizarding world; from the sickly-sweet, kitten-clad walls of Professor Umbridge's office to the unplottable recesses of the Room of Requirement. Dark times have come to Hogwarts. After the Dementors' attack on his cousin Dudley, Harry Potter knows that Voldemort will stop at nothing to find him. There are many who deny the Dark Lord's return, but Harry is not alone: a secret order gathers at Grimmauld Place to fight against the Dark forces. Harry must allow Professor Snape to teach him how to protect himself from Voldemort's savage assaults on his mind. But they are growing stronger by the day and Harry is running out of time …",
        cover: "b13.jpg"
    },
    {
        title: "A Little Life",
        authors: "Hanya Yanagihara",
        description: "This epic novel examines sexual abuse, addiction, sexuality, the complicated nature of love, and the lasting effects of trauma. Shortlisted for several major awards, A Little Life explores the enduring bonds of male friendship and the lifelong process of recovery from childhood trauma. When four classmates from a small Massachusetts college move to New York to make their way, they're broke, adrift, and buoyed only by their friendship and ambition. There is kind, handsome Willem, an aspiring actor; JB, a quick-witted, sometimes cruel Brooklyn-born painter seeking entry to the art world; Malcolm, a frustrated architect at a prominent firm; and withdrawn, brilliant, enigmatic Jude, who serves as their center of gravity. Over the decades, their relationships deepen and darken, tinged by addiction, success, and pride. Yet their greatest challenge, each comes to realize, is Jude himself, by midlife a terrifyingly talented litigator yet an increasingly broken man, his mind and body scarred by an unspeakable childhood, and haunted by what he fears is a degree of trauma that he’ll not only be unable to overcome—but that will define his life forever.",
        cover: "b14.jpg"
    },
    {
        title: "To Kill A Mockingbird",
        authors: "Harper Lee",
        description: "Harper Lee was born in 1926 in Monroeville, Alabama. She attended Huntington College and studied law at the University of Alabama. She is the author of the acclaimed novels To Kill a Mockingbird and Go Set a Watchman, and was awarded the Pulitzer Prize, the Presidential Medal of Freedom and numerous other literary awards. The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. 'To Kill A Mockingbird became' both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic. Compassionate, dramatic, and deeply moving, 'To Kill A Mockingbird' takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos. Now with over 18 million copies in print and translated into forty languages, this regional story by a young Alabama woman claims universal appeal. Harper Lee always considered her book to be a simple love story. Today it is regarded as a masterpiece of American literature. ",
        cover: "b15.jpg"
    },
    {
        title: "The Psychology Of Money",
        authors: "Morgan Housal",
        description: "The Psychology of Money is a collection of short stories exploring the strange ways people think about money. The author presents related biases, flaws, behaviors, and attitudes that affect one's financial outcomes and shows how one's psychology can work for and against them. Using this knowledge, he argues, we can make better sense of one of life’s most important topics - money. What follows is an attempt at summarizing this inspiring book - a few short and actionable lessons that can help you make better financial decisions. Let us see how our psychology can either work for us or against us. He emphasizes that your connection with money isn't rooted in science or math but in emotions like fear and greed, pride and envy, and the social comparisons that shape your psychological relationship with money. Getting carried away by such emotions may make you less wealthy and keep you unsatisfied for life. 'The Psychology of Money' stresses the value of learning to say no when it comes to financial temptations and impulsive spending.",
        cover: "b16.jpg"
    },
    {
        title: "Normal People",
        authors: "Sally Rooney",
        description: "Connell and Marianne grow up in the same small town in the west of Ireland, but the similarities end there. In school, Connell is popular and well-liked, while Marianne is a loner. But when the two strike up a conversation - awkward but electrifying - something life-changing begins. At a secondary school in County Sligo, rural Ireland, a friendship sparks between the popular athlete Connell and outcast Marianne, which soon ignites into an intense romance. Connell lives at home with his kind mother, and Marianne lives in a mansion with her distant, busy mother and hateful brother. Well-off Marianne blossoms at university, becoming pretty and popular, while Connell struggles for the first time in his life to fit in properly with his peers. The two weave in and out of each other's lives during their university years, developing an intense bond that exposes their traumas and insecurities.",
        cover: "b17.jpg"
    },
    {
        title: "The Hobbit",
        authors: "J.R.R. Tolkien",
        description: "The Hobbit is the unforgettable story of Bilbo, a peace-loving hobbit, who embarks on a strange and magical adventure. A timeless classic. Bilbo Baggins enjoys a quiet and contented life, with no desire to travel far from the comforts of home; then one day the wizard Gandalf and a band of dwarves arrive unexpectedly and enlist his services – as a burglar – on a dangerous expedition to raid the treasure-hoard of Smaug the dragon. Bilbo’s life is never to be the same again. Seldom has any book been so widely read and loved as J. R.R. Tolkien’s classic tale, ‘The Hobbit’. Since its first publication in 1937 it has remained in print to delight each new generation of readers all over the world, and its hero, Bilbo Baggins, has taken his place among the ranks of the immortals of fiction. The most prominent theme in The Hobbit is bravery, and the transformation of Bilbo Baggins from a timid homebody living quietly in his hobbit hole in the Shire to the brave hero at the center of a dangerous adventure. It was an act of bravery for Bilbo to simply leave the comfort of his home in the first place.",
        cover: "b18.jpg"
    },
    {
        title: "Alice In The Wonderland & Through The Looking Glass",
        authors: "Lewis Carroll",
        description: "Seven Seas is pleased to present Alice's Adventures in Wonderland and Through the Looking-Glass, an all-new, lavishly illustrated omnibus collection that contains Lewis Carroll's original Alice in Wonderland novels.For those who have never read Lewis Carroll's Alice novels, or for those who wish to revisit the beloved tales, this new edition of a perennial classic will appeal to today's reader who appreciates adorable manga-styled artwork. This 320-page collection contains all of Lewis Carroll's original text along with two full-color spreads and one hundred black-and-white full-page and spot illustrations.Alice's Adventures in Wonderland and Through the Looking-Glass is a collection of stories featuring the titular character, Alice, and her misadventures through the curious and fantastical lands of Wonderland. As little Alice goes deeper and deeper down the rabbit hole, she meets an assortment of oddball characters, like the eccentric March Hare, the whimsical Mad Hatter, and the enigmatic Cheshire Cat, who will all become familiar faces within this strange world.If Alice is to navigate the dangerous yet fascinating landscape of Wonderland, she must learn who is friend and who is foe, and use her good breeding and wits to find a way home. Through the Looking-Glass is a more complex book which focuses on the end of Alice's childhood and innocence. It is an exploration of the underlying rules that govern our world and shows the process of growing up as a struggle to comprehend these rules.",
        cover: "b19.jpg"
    },

    {
        title: "The Seven Husbands of Evelyn Hugo",
        authors: "Taylor Jenkins Reid",
        description: "The Seven Husbands of Evelyn Hugo by Taylor Jenkins Reid is a captivating novel that delves into the glamorous and scandalous life of aging Hollywood movie icon Evelyn Hugo. Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her life. But when she selects unknown magazine reporter Monique Grant to write her biography, no one is more astounded than Monique herself. Why her? Why now? Monique, struggling both personally and professionally, is determined to use this opportunity to jumpstart her career. Summoned to Evelyn’s luxurious apartment, Monique listens in fascination as the actress unspools her tale—from making her way to Los Angeles in the 1950s to her decision to leave show business in the ‘80s. Along the way, Evelyn reveals her seven husbands, ruthless ambition, unexpected friendships, and a great forbidden love. As Monique becomes more connected to the legendary star, she discovers that their lives intersect in tragic and irreversible ways.",
        cover: "b20.jpg"
    },
    {
        title: "The Silent Patient",
        authors: "Alex Michaelides",
        description: "The Silent Patient is a shocking psychological thriller of a woman’s act of violence against her husband—and of the therapist obsessed with uncovering her motive. Alicia Berenson’s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London’s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word. Alicia’s refusal to talk, or give any kind of explanation, turns a domestic tragedy into something far grander, a mystery that captures the public imagination and casts Alicia into notoriety. The price of her art skyrockets, and she, the silent patient, is hidden away from the tabloids and spotlight at the Grove, a secure forensic unit in North London. Theo Faber is a criminal psychotherapist who has waited a long time for the opportunity to work with Alicia. His determination to get her to talk and unravel the mystery of why she shot her husband takes him down a twisting path into his own motivations—a search for the truth that threatens to consume him....",
        cover: "b21.jpg"
    },
    {
        title: "Verity",
        authors: "Colleen Hoover",
        description: "Lowen Ashleigh is a struggling writer on the brink of financial ruin when she accepts the job offer of a lifetime. Jeremy Crawford, husband of bestselling author Verity Crawford, has hired Lowen to complete the remaining books in a successful series his injured wife is unable to finish. Lowen arrives at the Crawford home, ready to sort through years of Verity's notes and outlines, hoping to find enough material to get her started. What Lowen doesn't expect to uncover in the chaotic office is an unfinished autobiography Verity never intended for anyone to read. Page after page of bone-chilling admissions, including Verity's recollection of what really happened the day her daughter died. Lowen decides to keep the manuscript hidden from Jeremy, knowing its contents would devastate the already grieving father. But as Lowen's feelings for Jeremy begin to intensify, she recognizes all the ways she could benefit if he were to read his wife's words. After all, no matter how devoted Jeremy is to his injured wife, a truth this horrifying would make it impossible for him to continue to love her.",
        cover: "b22.jpg"
    },
    {
        title: "Good Girl, Bad Blood",
        authors: "Holly Jackson",
        description: "Pip is not a detective anymore. With the help of Ravi Singh, she released a true-crime podcast about the murder case they solved together last year. The podcast has gone viral, yet Pip insists her investigating days are behind her. But she will have to break that promise when someone she knows goes missing. Jamie Reynolds has disappeared, on the very same night the town hosted a memorial for the sixth-year anniversary of the deaths of Andie Bell and Sal Singh. The police won't do anything about it. And if they won't look for Jamie then Pip will, uncovering more of her town's dark secrets along the way... and this time everyone is listening. But will she find him before it's too late? This page-turning sequel doesn't disappoint. The plot unfolds at a dizzying pace as the list of suspects grows and secrets, lies, and false identities are revealed. As in the first novel, Good Girl, Bad Blood enlivens the story for readers through transcripts of Pip's interviews (this time for her podcast) and case notes.",
        cover: "b23.jpg"
    },
    {
        title: "Hush, Hush",
        authors: "Becca Fitzpatrick",
        description: "A SACRED OATH. A FALLEN ANGEL. A FORBIDDEN LOVE. Romance was not part of Nora Grey's plan. She's never been particularly attracted to the boys at her school, no matter how hard her best friend, Vee, pushes them at her. Not until Patch comes along. With his easy smile and eyes that seem to see inside her, Patch draws Nora to him against her better judgment. But after a series of terrifying encounters, Nora's not sure whom to trust. Patch seems to be everywhere she is and seems to know more about her than her closest friends. She can't decide whether she should fall into his arms or run and hide. And when she tries to seek some answers, she finds herself near a truth that is way more unsettling than anything Patch makes her feel. For she is right in the middle of an ancient battle between the immortal and those that have fallen - and, when it comes to choosing sides, the wrong choice will cost Nora her life.",
        cover: "b24.jpg"
    },
    {
        title: "The Song Of Achilles",
        authors: " Madeline Miller",
        description: "Madeline Miller was born in Boston and grew up in New York City and Philadelphia. She attended Brown University, where she earned her BA and MA in Classics. The Song of Achilles is her first novel. Set during the Greek Heroic Age, it is a retelling of the Trojan War as told from the perspective of Patroclus. The novel follows Patroclus' relationship with Achilles, from their initial meeting to their exploits during the Trojan War, with focus on their romantic relationship. In 2012, The Song of Achilles was awarded the Orange Prize for Fiction. The book is narrated by Patroclus, the son of King Menoetius. He is presented as a potential suitor to Helen of Troy. He is then obliged to take a blood oath in defense of her marriage to Menelaus. After Patroclus accidentally kills the son of one of his father's nobles, he is exiled to Phthia where he meets Achilles, the son of Phthia's king Peleus and the sea nymph Thetis. They become close friends and Patroclus develops feelings for Achilles. Achilles, 'the best of all the Greeks,' son of the cruel sea goddess Thetis and the legendary king Peleus, is strong, swift, and beautiful, irresistible to all who meet him. Patroclus is an awkward young prince, exiled from his homeland after an act of shocking violence. Brought together by chance, they forge an inseparable bond, despite risking the gods' wrath. They are trained by the centaur Chiron in the arts of war and medicine, but when word comes that Helen of Sparta has been kidnapped, all the heroes of Greece are called upon to lay siege to Troy in her name. Seduced by the promise of a glorious destiny, Achilles joins their cause, and torn between love and fear for his friend, Patroclus follows. Little do they know that the cruel Fates will test them both as never before and demand a terrible sacrifice.",
        cover: "b25.jpg"
    },
    {
        title: "The Invisible Life Of Addie LaRue",
        authors: "V.E. Schwab",
        description: "The Invisible Life of Addie LaRue is a fantasy novel by the American author V. E. Schwab. It was published by Tor Books on October 6, 2020. France, 1714: in a moment of desperation, a young woman makes a Faustian bargain to live forever and is cursed to be forgotten by everyone she meets. Thus begins the extraordinary life of Addie LaRue, and a dazzling adventure that will play out across centuries and continents, across history and art, as a young woman learns how far she will go to leave her mark on the world. But everything changes when, after nearly 300 years, Addie stumbles across a young man in a hidden bookstore and he remembers her name.",
        cover: "b26.jpg"
    },
    {
        title: "The Hunger Games",
        authors: "Suzanne Collins",
        description: "Could you survive on your own in the wild, with every one out to make sure you don't live to see the morning? The Hunger Games is a dystopian young adult novel written by American author Suzanne Collins. The story is set in the future, post-apocalyptic nation of Panem, located in North America. The Capitol, a highly advanced metropolis, exercises political control over the rest of the nation. The novel follows the perspective of 16-year-old Katniss Everdeen, who becomes a central figure in the annual Hunger Games – a televised battle royale where children from the first 12 districts are selected via lottery to fight to the death. The series consists of three novels: The Hunger Games (2008), Catching Fire (2009), and Mockingjay (2010). Each book was adapted into a film, forming The Hunger Games film series. Additionally, a prequel titled The Ballad of Songbirds and Snakes, set 64 years before the original series, was released in 2020. The franchise has sold over 100 million copies worldwide and continues to be influential in young adult literature and popular culture",
        cover: "b27.jpg"
    },
    {
        title: "You've Reached Sam",
        authors: "Dustin Thao",
        description: "Dustin Thao, a Vietnamese American writer based in New York City, penned this heartfelt novel. His debut novel, “You’ve Reached Sam,” is a New York Times and USA Today bestseller. If you enjoy stories about love, loss, and second chances, this book might resonate with you! Seventeen-year-old Julie Clarke has her future all planned out—move out of her small town with her boyfriend Sam, attend college in the city, and spend a summer in Japan. But then Sam dies, and everything changes. Heartbroken, Julie skips his funeral, throws out his things, and tries everything to forget him and the tragic way he died. However, a message Sam left behind in her yearbook forces back memories. Desperate to hear his voice one more time, Julie calls Sam’s cellphone just to listen to his voicemail. And Sam picks up the phone. In a miraculous turn of events, Julie’s been given a second chance at goodbye. The connection is temporary, but hearing Sam’s voice makes her fall for him all over again, and with each call, it becomes harder to let him go. However, keeping her otherworldly calls with Sam a secret isn’t easy, especially when Julie witnesses the suffering Sam’s family is going through. Unable to stand by the sidelines and watch their shared loved ones in pain, Julie is torn between spilling the truth about her calls with Sam and risking their connection and losing him forever.",
        cover: "b28.jpg"
    },
    {
        title: "The Diary Of A Young Girl",
        authors: "Anne Frank",
        description: "The Diary of a Young Girl, commonly referred to as The Diary of Anne Frank, is a poignant book that captures the writings from the Dutch-language diary kept by Anne Frank during her two-year period of hiding with her family in Nazi-occupied Netherlands. Anne Frank’s diary chronicles her experiences while hiding with her family in an annex in Amsterdam. She received the blank diary as a birthday gift on 12 June 1942, and it became her confidante and source of comfort during those challenging times. Tragically, the family was apprehended in 1944, and Anne Frank died of typhus in the Bergen-Belsen concentration camp in 1945. Her diaries were later retrieved by Miep Gies and Bep Voskuijl, who gave them to Anne’s father, Otto Frank, the sole survivor of the family. The diary has been translated into over 70 languages and continues to resonate with readers worldwide.",
        cover: "b29.jpg"
    },
    {
        title: "Happy Place",
        authors: "Emily Henry",
        description: "Emily Henry, the #1 New York Times bestselling author of Book Lovers, People We Meet on Vacation, and Beach Read, weaves a tale of love, friendship, and the complexities of relationships in Happy Place. If you enjoy contemporary romance with depth and heart, this novel is definitely worth diving into! “Happy Place” is a heartwarming novel written by Emily Henry. It revolves around the lives of two individuals, Harriet Kilpatrick and Wyn Connor, who have been in a committed relationship for eight years. Although they have separated, they keep their separation a secret from their friends. In this glittering and wise novel, Harriet and Wyn find themselves sharing the largest bedroom at a Maine cottage—their friend group’s yearly getaway. For one vibrant, blue week, they leave behind their daily lives, indulge in copious amounts of cheese, wine, and seafood, and soak up the salty coastal air with the people who understand them most. However, this year is different: the cottage is for sale, and it’s the last week they’ll all have together in this place. Harriet and Wyn can’t bear to break their friends’ hearts, so they decide to play their parts. Harriet becomes the driven surgical resident who never starts a fight, while Wyn plays the laid-back charmer who never lets the cracks show. It’s a flawless plan (if you look at it from a great distance and through a pair of sunscreen-smeared sunglasses). After years of being in love, how hard can it be to fake it for one week in front of those who know you best?",
        cover: "b30.jpg"
    },
    {
        title: "Ikigai",
        authors: "Francesc Miralles, Hector Garcia, Nicholas Kemp",
        description: "Ikigai: The Japanese secret to a long and happy life. The people of Japan believe that everyone has an ikigai – a reason to jump out of bed each morning. And according to the residents of the Japanese island of Okinawa – the world’s longest-living people – finding it is the key to a longer and more fulfilled life. Inspiring and comforting, this book will give you the life-changing tools to uncover your personal ikigai. It will show you how to leave urgency behind, find your purpose, nurture friendships and throw yourself into your passions. According to psychologist Katsuya Inoue, ikigai is a concept consisting of two aspects: sources or objects that bring value or meaning to life and a feeling that one's life has value or meaning because of the existence of its source or object. Inoue classifies ikigai into three directions – social ikigai, non-social ikigai, and anti-social ikigai – from a social perspective. Social ikigai refers to ikigai that are accepted by society through volunteer activities and circle activities. An asocial ikigai is an ikigai that is not directly related to society, such as faith or self-discipline. Anti-social ikigai refers to ikigai, which is the basic motivation for living through dark emotions, such as the desire to hate someone or something or to continue having a desire for revenge.",
        cover: "b31.jpg"
    },
    {
        title: "One Of Us Lying",
        authors: "Karen M. McManus",
        description: "Pay close attention and you might solve this. On Monday afternoon, five students at Bayview High walk into detention. Bronwyn, the brain, is Yale-bound and never breaks a rule. Addy, the beauty, is the picture-perfect homecoming princess. Nate, the criminal, is already on probation for dealing. Cooper, the athlete, is the all-star baseball pitcher. And Simon, the outcast, is the creator of Bayview High's notorious gossip app. Only, Simon never makes it out of that classroom. Before the end of detention Simon's dead. And according to investigators, his death wasn't an accident. On Monday, he died. But on Tuesday, he'd planned to post juicy reveals about all four of his high-profile classmates, which makes all four of them suspects in his murder. Or are they the perfect patsies for a killer who's still on the loose? Everyone has secrets, right? What really matters is how far you would go to protect them.",
        cover: "b32.jpg"
    },
    {
        title: "The Fine Print",
        authors: "Lauren Asher",
        description: "“The Fine Print” is the first book in Lauren Asher’s Dreamland Billionaires Series. The Fine Print is the first book in a series of interconnected standalones following three billionaire brothers. It’s a contemporary romance that follows Rowan Kane, the youngest of the Kane brothers, as he embarks on a romantic journey with Zahra Gulian. Their relationship evolves from enemies to lovers as they work together in the Dreamland amusement park. The book combines billionaire intrigue, workplace dynamics, and a delightful grumpy x sunshine trope. As Rowan and Zahra navigate their complicated feelings, readers are treated to a magical tale of love and secrets.",
        cover: "b33.jpg"
    },
    {
        title: "Pride And Prejudice",
        authors: "Jane Austen",
        description: "Pride and Prejudice is the second novel by English author Jane Austen, published in 1813. A novel of manners, it follows the character development of Elizabeth Bennet, the protagonist of the book, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness. In the early 19th century, the Bennet family resides at their Longbourn estate near the village of Meryton in Hertfordshire, England. Mrs. Bennet’s greatest desire is to marry off her five daughters to secure their futures. The arrival of Mr. Bingley, a rich bachelor who rents the neighboring Netherfield estate, gives her hope that one of her daughters might contract an advantageous marriage. Meanwhile, Mr. Darcy, reputed to be twice as wealthy as Mr. Bingley, is haughty and aloof. As the story unfolds, we follow the character development of Elizabeth Bennet, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodnessPride and Prejudice remains a beloved classic, exploring themes of love, social class, and personal growth.",
        cover: "b34.jpg"
    },
    {
        title: "Me Before You",
        authors: "Jojo Moyes",
        description: "“Me Before You” is a romance novel written by Jojo Moyes. It was first published on 5 January 2012 in the United Kingdom. The story revolves around the relationship between Louisa and Will. They had nothing in common until love gave them everything to lose . . . Louisa Clark is an ordinary girl living an exceedingly ordinary life—steady boyfriend, close family—who has barely been farther afield than their tiny village. She takes a badly needed job working for ex–Master of the Universe Will Traynor, who is wheelchair bound after an accident. Will has always lived a huge life—big deals, extreme sports, worldwide travel—and now he’s pretty sure he cannot live the way he is. Will is acerbic, moody, bossy—but Lou refuses to treat him with kid gloves, and soon his happiness means more to her than she expected. When she learns that Will has shocking plans of his own, she sets out to show him that life is still worth living. A Love Story for this generation and perfect for fans of John Green’s The Fault in Our Stars, Me Before You brings to life two people who couldn’t have less in common—a heartbreakingly romantic novel that asks, What do you do when making the person you love happy also means breaking your own heart?",
        cover: "b35.jpg"
    },
    {
        title: "Haunting Adeline",
        authors: "H.D. Cartlion",
        description: "Haunting Adeline is a dark romance thriller written by H. D. Carlton. Adeline Reilly, a young author, inherits her grandmother’s Gothic mansion, Parsons Manor, in Washington state after her grandmother’s death. The novel delves into themes of consent, morality, and deception, creating a dark and suspenseful atmosphere. It’s the first book in The Cat and Mouse Duet series. The story follows Adeline as she uncovers the secrets of her new home while being stalked by Zade Meadows, the leader of an underground organization called Z. Zade aims to end human trafficking, and Adeline finds herself caught in a dangerous game of intrigue and suspense. The novel also explores the balance between morality and character determination, especially regarding Zade’s morally ambiguous nature. Despite initial controversy due to trigger warnings, Haunting Adeline has gained popularity on social media platforms like TikTok, specifically BookTok. If you’re intrigued by dark romance thrillers with morally complex characters, this book might be a compelling read for you!",
        cover: "b36.jpg"
    },
    {
        title: "Red Queen",
        authors: "Victoria Aveyard",
        description: "Red Queen is a young adult dystopian fantasy romance novel written by American author Victoria Aveyard. It was published in February 2015 and marked the beginning of a captivating series.  In a year known as the New Era, society is divided by blood. There are two distinct groups: the Reds and the Silvers. The Silvers possess supernatural abilities, making them superior, wealthy, and almost godlike. In contrast, the Reds are lowly and impoverished, serving as servants to the Silvers. Seventeen-year-old Mare Barrow is a Red and a skilled thief living in a village called the Stilts. When her best friend Kilorn faces conscription, Mare plans an escape and becomes entangled with the Scarlet Guard—a rebel group fighting for equality between Reds and Silvers. Along the way, she encounters secrets, betrayals, and unexpected alliances. If you’re interested in exploring this thrilling world of blood-based divisions and rebellion, I recommend diving into the pages of Red Queen!",
        cover: "b37.jpg"
    },
    {
        title: "The Midnight Library",
        authors: "Matt Haig",
        description: "'The Midnight Library'  is a captivating fantasy novel by Matt Haig, published on August 13, 2020, by Canongate Books. Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. Up until now, her life has been full of misery and regret. She feels she has let everyone down, including herself. But things are about to change. The books in the Midnight Library enable Nora to live as if she had done things differently. With the help of an old friend, she can now undo every one of her regrets as she tries to work out her perfect life. But things aren't always what she imagined they'd be, and soon her choices place the library and herself in extreme danger. Before time runs out, she must answer the ultimate question: what is the best way to live? The novel beautifully explores themes of regret, second chances, and the infinite possibilities that exist within us.",
        cover: "b38.jpg"
    },


    // Add details for the other books here...
];

// Add event listeners to book buttons
document.querySelectorAll('.shelf-popular .book, .shelf-may .book').forEach((bookButton, index) => {
    bookButton.addEventListener('click', () => {
        showBookDetails(index); 
    });
});

document.getElementById('close-button').addEventListener('click', function() {
    document.getElementById('book-details').style.display = 'none';
});

function showBookDetails(bookIndex) {
    const bookDetails = document.getElementById('book-details');
    const bookContent = document.getElementById('book-content');

    // Get the details of the clicked book
    const book = bookDetailsContent[bookIndex];

    // Display the content for the clicked book
    bookContent.innerHTML = `
        <h2>${book.title}</h2>
        <br>
        <p><strong>Authors:</strong> ${book.authors}</p>
        <br>
        <br>
        <p>${book.description}</p>
        <br>
        ${book.cover ? `<img src="${book.cover}" alt="${book.title}">` : ''}
    `;
    
    bookDetails.style.display = 'block';
}

function voice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        const voiceText = event.results[0][0].transcript;
        document.getElementById('search-input').value = voiceText;
        searchBooks(voiceText);
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
    };

    recognition.start();
}

