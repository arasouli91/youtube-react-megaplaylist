var reverseList = function (head)
{
    if (!head) return null;

    return rev(head, null);
};
var rev = function (cur, prev)
{
    let newHead;
    if (cur.next)
    {
        newHead = rev(cur.next, cur);
    } else
    {
        cur.next = prev;
        newHead = cur;
    }
    cur.next = prev;
    return newHead;
};

