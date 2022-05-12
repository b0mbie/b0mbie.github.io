textwrap = {
    wrap: function wrap(what, lineLength)
    {
        let length = 0;
        let words = what.split(' ');
        let lines = [ [] ];
        for (let i = 0; i < words.length; i++)
        {
            let word = words[i];
            let strlen = word.length;
            length += strlen;
            if ((length >= lineLength) && i !== 0)
            {
                lines[lines.length - 1] = lines[lines.length - 1].join(' ');
                lines.push([ word ]);
                length = 0;
            }
            else
            {
                lines[lines.length - 1].push(word);
            }
        }
        lines[lines.length - 1] = lines[lines.length - 1].join(' ');
        return lines;
    },
    simple: function simple(what, lineLength)
    {
        let lines = [];
        for (let i = 0; i < what.length; i += lineLength)
        {
            let lines2 = what.substring(i, i + lineLength).split('\n');
            for (let j = 0; j < lines2.length; j++)
            {
                lines.push(lines2[j]);
            }
        }
        return lines;
    }
};
