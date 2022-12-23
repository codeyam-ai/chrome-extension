import { useState, useEffect } from 'react';

import { growthbook } from '_src/ui/app/experimentation/feature-gating';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import { Gradient } from '../../../components/gradientBackground/gradient';

export interface TicketProjectProps {
    name: string;
    description: string;
    coverImage: string;
    url: string;
}

const TicketProject = ({
    ticketProject,
}: {
    ticketProject: TicketProjectProps;
}) => {
    return (
        <div
            className="rounded-xl border border-slate-200 dark:boarder-slate-600 p-3 text-slate-800 text-left cursor-pointer"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 1) 25%, rgba(255, 255, 255, 0)), url(${ticketProject.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="text-lg">{ticketProject.name}</div>
            <div>{ticketProject.description}</div>
        </div>
    );
};

const TicketProjectList = () => {
    const [ticketProjects, setTicketProjects] = useState<TicketProjectProps[]>(
        []
    );

    useEffect(() => {
        const getTicketProjects = async () => {
            const ticketProjectIds = await growthbook.getFeatureValue(
                'ticket-projects',
                []
            );

            const ticketProjectObjects =
                await api.instance.fullNode.getObjectBatch(ticketProjectIds);

            const ticketProjects = [
                {
                    name: 'AI Capys',
                    description:
                        "Sui Capys meets the power of AI. Let's bring Capy's places they've never dreamed of. One ticket provides 3 AI gnerated Capys",
                    coverImage:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAABMCAYAAAAoVToVAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABwtSURBVHgBzVwJfBRV0v93zyST+w4hhEDCHSAcgoAQIagcoognqN/+lM9z8b6XddcDb113cdddjxV1PVdEYVGURVEjKqDcIQECCTkgIXcyuTOZ6f6quqdnpmd6kkkAPwom09Pvver3quuu1w30DgTt+/HHHxf5w8eyLAs9fWsff+e1c57tRr+N8HjPw3us90frjz5CjwMzBw2KlURcLwPj6ecE+sTQqJgg0RKTPWUhspOXIZROyfSP0QkG2AVq4uXwT2VddEJQ1qeOUht0B3QoOsfKymkZgazS3fFA1Y9475flGDl2JJ5b+RLCwsJ1Pdd+vBq2rq7GK5dc3SgIQil9Guiz3uFw5CQnJ5f0cBXj8xPS0qKnzMy6Z3/uvrubrU0xhFAlCn3FRaTg6pn346o7F6D8azNaK0T0DgIjQcDYXDdBD7vKv0TG4hBkz8v2abPb7TCZTOB1SZIEIhZsNhs6Ozv594p+/fqtoDbZ6HpGMxfGjRycZu+U1z67cuUEJtKfnnwKTY2NdAETRg+YiSsnLMe0a9JRu0dEa3lvCEaLMwkwhUqwt4g+bX0hpDZKku3KkUhz1BhWDJGQcaOE8KTe3dS2tja0WFtLcl/CefNe7F8CF/ur4INt3GCFYN+KgjAhIjwc3276Cnfcdx/S00fjyonLceO0v2BYxlCw1LSe6C2HEaeaJKRd7IBokXzaGIKjJcRnOlRJM77RBqOA6pYyWDuqlWOzRUZQpARzCHGRDb2GsLAwhAZFpKVfKX2bl5cXC6+7afKeQ1Jc4ksQpFkmUcScCy/Ch+/8CyZbOB657y9IsZ8DsyMUA7Il1OwV0GXtLdGIEA7iNFpURKqM1mPqeEW8nPOKGe2AvU1AZ53orSHdkzQ4F2GJRXhoJJJnOpA6T0byDJmID1iiifuCPHSlczSL5KYvNyA2Lk6n7zo7O9BkbURMQjRC40wxZrN5WkRExLs5OTmuO6hb9QMXP7NUFIXrRCIY9+i0dSAzNRvnht+B5n3RGLzAjsh0EgNBQpvCZT1zghE05JvQXuleumYU+NNlFUjkhe6pJLqv67mSgXMdGHiegLAkIChcREicAHOo4IFEPc7btxd/fu4ZNDQ0IDwiQof61b//DQcPHFCOQ0NDERwcPOumm27KdlpmBcyeU2tsq7neIXfRBOjCQZGwCBFYes4zkFvC0HocOPEDMGC2jPpcGu/ouyK3dwhoOurD5Mpf3/PQ3ZuIgRJiRkk4vlmduuCkd1h/CUmT9bj0OGSUlZVi86aNkOwOXHPd9RgwIAXMIJ5QVnwUd95zv+s3iyoZiEdXrFiRo83ERbR3bv85bnfRxlkmUxBCgsJx2fgHMSr2XNRFmNHeovZpLTeh+BOyNF04JcAOh04EPaXIoJ9AHJZ4tgPlOR6ElVVTEBRFf83GN7KjowMbP1+PkpISLFh4CUaMHAXNG2DsLJIH8/ORMjAVGWPG4Y3X/oG5c+djyPARCAoKYis7Kysri3VbHePTiCbEBiWNnzPqZtikdkxLvxzDE86G1O4gZQp4WjZ7R+/1mCFBBOjdBD8EU5tUJ49dN+ZyW4PoGsNSw0NtjVCUvhisH7s/dy82bvgcGaPH4s577wfpKI9W9YLPPbECCf0SUVdfh4d+/0eFuOs+/QTnZJ2L6fQJJsLFxMQMJhGtZzdEwUAesuCodcRGhMbj2kkrYDZZFHxdraQTwk7CpyIFHxwpKzomtB/pmQhSyhans8sfSVYW2mklLj4moK1aoHOeCxLcxKSPZBdgLTLr1qzNrKOa3J8KCZGDZafMAjt/2Y4d27dh6Y23oF9SErkSrfhs3ae48KKFMBHxmItkuqDJbMKYseOwd/du1NbWYtSoDPT/bTKeeORhjBs/gW6WyMQm90vYw3g1ouHTO66LURpFi2u+nY2sQ0hxH+iZOOzyMycEx0uIHgpEpUKxkJZYtwI2GKj71dUsofGojLo9AppLyV2wIyBbI9Iq4sdL6jw8UE6aMhWTp0xTjutqa/DsE49hHhGM+7zw9JNEqEys/WQ1nnr+Rfy8dRtCLBakkJ4jjmLOwqTJU3CiohwpqYMIg6QwF31cnAZzLQbr9IvMLC8gOKO76bq5IWa4hISzgOh05k5jovQEQZECEscLiMsgY5Mv49gmcmtaex435HIH4sbAxWGu2REnb9/6E1IGpaKmupJEbSZ279iBc7NnY/YFc/Dsisew7I678eZrr2H5I48ilFwPRrHu0zVoaW4mK7sPF5IOVI2FmKbhVTQq+SDCNdPuzSaHjvwzN/s7Osg7rpTh6PSjx+gKsRkS0i8BkqcD4f3ZJ8JJg0hRQxjhCk+W0HBIUHw7fxCSIJOzDB+CMXz0wXvYvXMHZhCxhg4bTkp+LIngLti7upA1cxYOFxzCeXPnYnD6ELz5+quYOGkyuxgYRgZAJj9u0tlTMTgtTQm5mpqavl+8ePH3hFZ2U0OSfC4qSaR0rQYugMA6SkbGDRKGXyMgKk0jVt/8NiNgGkQPEzHsWplwa3h98Ut2WTWgXrB+7aeorqzC/csfpkW7zf3SG2/G2jWr0dzUhFtvux3bt20jEZ6CJ557gRzdWEUH1pIoTzp7CsZkZrqvQ8RgiWRQKMKymtw2MTskWM9pRveXiZM03YGhlxHhEgWPG9yd7uo7hMQIpBdlNBXBkOMcneRuRDgQkaJvszbUK/NpamokEf0REyaepbgZwaS3oqNjSJd9jHkLLkbmuHHK+eNlZYozOzg9HZGRUTpczGnkCG9ZsmSJntOkADwJDn/SLpGROlv08LRPM9Bl4jNJ1032w8V0+vjXJvLdZEWHaTCRlDjHzT/mfI9FV1ypWEANpk3PwlmTz1b8P9ZX323+Gu++9SYcBtLmezVnGMUWAd31J6tkCpVJFGUkTMAp0Vu9AbbKg+YIZI2NJ8nc1lSs53TWTUtvuRm8zrDQcC98Ai6YOw+SQ8Kajz4kEf0J9zz4EEJCQhAIuJxbdEM1JtKQRaRjhv5K3GUAnPEZNB8oeJeJZNCBp+/FjBMnT0ZlRQUe/f1yJKckY2zmBMyZP9/V/u7bq8iq1uKhhx9RcmuBTIP/aESTDbJEai86nXo+EDvq1CYO+wKRgwRyayRUbdPm6p5T2wkBHQ0OhCa412E2B2Hh5VdgNlnI+rp6Cs7DXePefPUVhJPuemD5TUQwM4yMjL8gRRNPylsYc1rsaAqEp0FJHp4JMOBcNbWkgntODpuAY18JhouMiIjEoMGDER+foPz++KN/o6PThsXX/o9fgsHrrNN66nQajFK7YrCMwfOgpevPCAimTE70cK2O4Nkiw3qEQrGKHpU5QoItuPWOO3UZDkbVVOJQoxADMJtFfT6NieaZL9ImkXwOxY4xZwaHuYCt6WjnsaxvkB0i2mv8z1frfgmJrD5wV9sqtwoo+JeMxgIZtiYJsp3ze/T7sIySjSLy8/PdOu2xxx6T195ZrEMSEkf+2DlnGMGcEDWEnV8ZPveZmCE8VU0G1B+QEDtcgIM4xxTM8alnkOirnznedFAGp7mMPh/o0drsJrRSUmHMmDHymjVrVE6jBJtLp2l3IzKNs584I8EcLiCkn/4c59oSziJDQAmC+jwJJRtEHFgl4NDbAqp3Cj5c6Q32ZhZtL0K6yonskblFWTliThOdjh0PYxdDtZZnLigpIDiLL5wwGClhAMW/hWtkFK8zwdEqUtxM4loloiJHUBIA/sDeBhz7hjiNizC6FJ/zB3E0Vbv06W4yAsKa2w4rBV1GHRQhkwicmaKpQQJFCdW/uBOZ1iMmCu5haAi5UHPkYxMit1OqfASlq+KhdOysFdBCebymEk5gOv00I9oKXAEwyzqdRvJMOq3IlY4KS6IIwPLrEE12JhiFXoauIQnqze1qcVaX7N33514trK/K+uZtivSP9Jnb5WBOk7S4izAGxf46omnvkLH+7S/x3O1/x4N33YGft21VKt3dg6wsmnN2lpjez1MwxBgAiKqX4TxUOQ2azyKzL3T6uYw57PN/f4GVf30SH29eic3/3YhlS6+jwHmVYsn8g+rAsu9oicMpAX+evydIDrsrNaSIJ1vPTOla5YQyWDr9IVMjpW7+8cZTsLbVuM5xluIfL63EeZRV5cRgTxCezLpIojoEuRWhNL5LgJ3jUlnlRE4y1O1Xaw89Fet7Wq0oiC6iuLIcksdgyXb6Oa2spJjiwTrXb85p8T+7rQv5eXn+B3osPnmGgBH/I1C6SkAqZUEGLaDEwmWc/laD+5RZAoZeSg566ClQNySJ3mGUjkqB5OVPFo6VlsKtRwWnSKofTgj6BddMZQP20HA4gdDX5JKxaDNmguBYCf3O7gKEQIjqDs9cfppnupurUKcbGpusrmNtSYqKJwKGsbz1CIKfc05r2kWFmRwJ1Tv8B862JhFhFEHEZHgaH38E9HJuBa+iRGc9hR+202tBPZU9HwvOvW8859j4vmt43nHFEcGBNwRyak3w8El9+xKtyjaYMGAGiXCcw0ku4/5MKE0iXcViVLo7cJG49biMyCGnzxykkaIXXGKpEkzbDDloaKrBCGPjxMpYKTg3yGigOkLtTioc1wWSUFRvlGQTcfQzGekLJRz+UFSMiTG4A3x3utsDJBLz5tLTaz+HDB2GhEQ1gGQnQlJK7kQwKpmNGj3ap79ssNOxjvTV0f8AB94E8l6n4sgmkQgWaB5LxSeaZN7vo+QLQ/s5unU9rrrqKnWMhsE7C2UthJIacU4ZpxoSExOxeNENCA+Odu3WDQoOwo23/BZBQcE+/b3Lmo5OMhjfCKilanxbZfe1UT0iNQwPjneg/wwH0i51IGkKuSZ7Oftr8sso7MZyloOPzf5wt5ygu9YgUZlOuRJONXAp7fplN2FM8kz89cPfI6FfLH5z0/WYlpUV0Pj6AySG9b2bF6/YQjamf1YXLFEianYDVdtNARHc7lAyt26dxvi8M7e8Ta1mL1eBcNqAjeQ5vxmBSZevBu+58U4M+gPWYxU/wLlryGu7VvcjKeUlUY5NxpHVpl4LEKsxjgpcfprs8FUadftw2q0oi50l3BwwwRiajsroqBWdrlrg3MZ9rUdFZeMyb5ZmkAMcLgq6TZdOQ2CgP21WEeXfGJf9/7+gqwmUYBT6qGZl2CkrUvULF2ic+cMA8YiiWR+we0cEnlCTK1JK5QyhGt29Y9/KvdZlblB3ODUeNlGwT75ZVM9FGAbJ+Zespzv29GjxnqVyZ8o2UaGhWXKdO/0g+xyz7qr4iW7iHrFXUxDIpeifZceAmQ6EJDpUfCSTDXkC4sYGhoiJRLkEQbOermqUMdXUO9pyzISjn1KU0P5rcZygO7bTdY9vBqmKbjcCGAJbxtrdlHykDG0srXnQhXb0n2pHRyPpNkqZm0MDQ+ip0zwq7N2DtUiklLGkZA94O+ivBZ2NMkq/YJESPbaW9g44999SJqC52AwhiFL5qVSEGSspScwIsqaNB3tX2HWHUQE838SEK1wtITmbLyo4i8jd5d76npdjAjUckEk18J5csQ9awX3tqCGSslOyZhdLjZksKFnREpFS5vy4UYCoaD5ajcCDUgHcRhrcXiOiZL2AknVqurp7ovSWYKq33lEvU1UJKCKV0NkYGMG8u3i6EvxsQuVWEscBvG3euU5J3dxsbwuAy5REgiT4RAS94XxOUlaT49tIAXLi2bJyFzly0GdLfPdbdAes6G2Uk6zeKaNqh6DszQhoHFRfz8s1122350xHe5WglPN6zbJONKJJ1Fej1LPoNdiowFr+rYCaHeRppxPxRnORWaYicy9KS7SG1kqZ0jmUodgrUI6rd9zJva3t1cg7kYO0+HFIiR7lwmssB73kfieNJRn6uqd6Fn0GJl5drqDoIK5+hyaoJTbeRByeTHXGGH5GSd1jxrlORwfd9WoZLaUkOsUUKBMX8Lm+OtE/Fa/BZ7krEWGJRlrCRMwcco0S01KtEqcqbuYagbYt4aQ4zRv44QibFcrHWsRnnBNWvmSn+Dr3YMinZjEslyMSpyq4mzsakHf8W+ynT//oobhs3AMYnTQTQeYQtNGkalrK0ERcaTZbkBSZjriwFHcYpj3+7G9tslfAzmHUR8uWnHInzCUezuyirCmgU3klWujAmFEYmTQNB0/85EJdRXftjZ/uQmpMBmKobFVcl4vG9kpo7BxqicLQ+ImYn7EMw/tN6ZZgstehK58mOxwnfeu9N+4Kxp16h5M4wC51oLtNwSHmCExJX6RLuvFl7JRNLa7PxZ5jm9DYdgKe8t/e2YS8iu/xypZbsevYFz3Oi8VTF3uqRycnnyUNuXhx8xI02+pxssCORweVxOxSJyqbjuB367PwJ8KtPFZp0JthWOwk5XHL3kJblxX/2v4Q9ldu7vFhJJ8Ku9QHQ6AVzA5UbcFL312HyuajpOjtOFk4XLMdf/7uajy/+Uqs+uketHTWo6h2N443Fhj0Jl3WWYcPdv2R9FYT+gI2ezve/eUPqGkt9c9wxFS6gF1QNHT3i1WdYju6pHYPUZHwc+mnWLXtXrTThGNCkxBsCmxbeXdQRv7Hsfp8+s4nQh1ynW/urDWc2dcFr6OgajtOBpraa7CdPHa/Ooq4yse5VfafGoxwkF7YV/4Vvj/6bxRW7yCRsSPSEo9p6ZcqXJVz5AOlD8Pg+ExYzCe/E3Bq2mXYUfY5SuvyVLshw7kPTXvO023pSur34auDb/ew/wMIj4pQnvfcsH498vbuNeyzq2wjLh5zj2GbRGbWx7lVqt1e12V5X7X1bhK/H9SnQZzmsLmjFl8fXKXry9hSY0err3g4SYiyJGBZ1uvYdOif+Ln4P4q7wPgjgqLVDk6CUeIaG/JfJoIZ7zSKio5GbGwcqqursOyuu7E/dx8uumQRiouK0Nrc7NO/mkpwDiqcmgTfLDIbAt1WKwZBcO9e5ptW21qmKPb8E1vcj894pTkFz7/EBSkxo3CqIDY0GUsmPIqH5/0H541YitCgKCREDHK180wqm4tQUL3dYxZuyL5gDpaT4r7kiiuw4pnnlIdgv/zsM+K4SISFhRpe006GxuHw/04K3a4hZXd3heS6bpfUhvd3PIxy62GvYfqpyR5/uW1n6QYMihmjuACBQHVzsXJnk6OGG7azqk0MH4wlZz2KS8fdrxN9Tm8VVG2FravdaxZQHuM5f/58PPLgA8pD/vwUcWx8POXWJPrIfj0F1sfBZmOd7Kywu46hVlhE18tDdh/fhIOVW/ULoI85yAxTkNk9ObidVxaR70m/vbr1NqfC7tkhK6jehioiXCCRjl5XqnriaM0en36KRSfJ2PLtN1jym+u4zKY8RVdTVaXchCCav8Nu91kbt8WHp8AoNGLJ83Qu3JlbWS5RxVBGfuUWn4HZcy7A7x5bgTtImS5YtEh5hEZzObQCLMOhih/x7o4/EAd178OwD1ZFYU3/qGG9c3gF7Y9MN8fYJ2R03/z3v4gk5T9v4cUup5d1XEdHGzrbO7z6q+1D+02G0WT4OXfS+aW+zq2zkS9wlKuoHnPMyMzEH554CpdefjlGjx2DrOxsLFq8WLcSwaN/fvl3JKqfoTuwdtQoYU1SRJohzeySDa38CgTvcpHsvma4JdYvfjZsb73yKuJiYnHXAw9Q/BmElIEDYW20or2tDd5I+WUHs4ZeAyO2l/iiks21zcnFaQ6075edvGPt0PtD/IA8P1fE3DVl2nRkjB6DAQMGwPOueG5g4JclfXfkHXR6p0U95lNYuxPp8eMVA+KtKdkPzCl8V9Gr3cWEafGZ6A66SAxXv/8+Dh86hGtv+F8MHTEC5WXH3PviPKY1JHEiUqPHGOJhz99uEhp1m/r4fH1jbYlde0uJ5PBYAvlCR48qr8hyTTZ9CCpOlMOfMlLGkINa03rMt8E5y+MNBzCSshM+Hahtf8V3SqwomrovIE9ImYOw4CgNpSEo7xT6YgPqqmpwNem4goKDPn05C7Ig4zblBhoBh29VLUX7tN8uoq2teaGBHNctdocd4aH6/WH8fos7b70RW3/8AYcLChQCLrjoEkVH+AXSnodI0RtBl6MDx8kyp8Rqr2JwU7OutVxxMqenL4bFFIbuFF4iiTa/eAXoXi2yrt6wfh2efuwRHNyfp+vLBuCCkTdgVL8ZXnNRwUEMRDTZsrb4hQbtnCvLkZOTI7W2W5/q6GpDf8o16a8K/LJ1O24nFr/71pux7YctygOoyx9fgbAoY/dCIl1Uyy8oMoCyhnwMiRsP0fnWPlep0FaLT/Y+i6vOehhBZP7VR6i7KdrQ/4Vj7+5RTJUF0ufA/v2KJfWECQPnEo57vHq6oZPiUgod30tMTJS1qMPFaazXnt95TU6XvXNLcvRwn7lqP+tra1FYVEgKtREXLrgYTz7zPF7+5ypMmTFdVyMQnG6IEeyjIuaEgXN0Ow9bKDuyes/TlN+6FRHBcYq3331Ipo4Loyhh6dQXlbcHdgeyzwEwieqR10953pnh9YVOewdlW1reu/Rvae9QNCBpm4RcQkxEk3bt2uXYU7V9MSnEUtmPAu6y2bBz+zaUlqj+1dTpM2AhD/tPf30Zo8aO1a0pMWygz3ibo41EswADY8e4FsHvN9p08DVMGbQQg2PHuRCYDRbDRmb3sS+VHJsGfJPvmvmWkozsaUMM31fWYeeNvJ6I/WeEBEUZ9rPZO9HaaS0rry98Kjs72+VdMfi8Y/DrEyvriipz50WHJJVKBkEwn2lrbVNeClJdVYndu3Ypr2/gF7dZLBbXlDkGHZk03Wd8JTmz/SPTXNUidnPW7XuRiJWJzOTZ7sXBhA6bb1GytCEPXxx4Gb+UfObOOdKkOKq477wPcNHY2xEb1l+n1J1JduLcUIxLOR/3zn5fiTKCTaE+JGYRbLe1UjqqMbe0qXDu1+1/KyLVpRMZH6Jxh9qEgsIf87eNdDgcT9sp9OBXLzh3dyqQ2C8J6UOHIW9fLsZPnEjxmh0P3n0ncvfscfVJJqe1H2/a1RFcRnHtHkwcON915vuiD8gTT8ak1Itcy2Mw0aJZRD3liX03LqL8NusVSkl9TlynF//w4FjST/fhj/M/x3VTnsGE1LkYQWnwzJTZuHjsXVg+bx1umfF3SnOfpXNlKP+vZHlZnze111mJYE/vKN8477a3soqc6SAd9xgJM0fzDt5fSt9PjEwf8B4JyixZcvDLaWKioiMHpQ8bGlNYeCSa9VpJWYli0g/k7vdYMvl2yeejtaMJrWiGFvY4ZBuOUq5+aNxUspKVSrLxWP1BXDT6LtS3Vesm0dJphbWtjoyJewf1ocofECQwd1io8hSH3PItSsnOg+Fcf0ckZmFEfJZHrKdCY2udy/iQn281yWIjRd1W4opcWbbnfnd43fsvbbq3TqElKWWjx9S7VQD8iPbs2bNNzc3NgtVqFQsLC5X+AwcOFI4fPy6npSnv4RHMZrOCuKSkRGvnTXoyt2m4qD+ov+6cP+CH7CsqKiS+jlE74+JreJ/zxM+/eQk8R56XNidtjtym4Xeel4ireC+wRDpM4mcr/L2yNRDwfhOxiZAyh5qIGzl5ZuZv57HyrbVrv7U2f321cxo+D9yudv524nX119q8+/Fvnqv3XDz7e/eFqqoCSB0E2KmbcTL0OJQ7wwQWfN8y5d3X+7zO5zTqo+yvFfxOWTaal3OMUVufuej/AEkuPL41mDNGAAAAAElFTkSuQmCC',
                    url: 'https://espn.com',
                },
            ];
            // const ticketProjects = ticketProjectObjects
            //     .map((ticketProjectObject) => {
            //         const { details } = ticketProjectObject;
            //         if (typeof details === 'string' || !('data' in details))
            //             return null;

            //         const { data } = details;
            //         if (!('fields' in data)) return null;

            //         const { fields } = data;
            //         return {
            //             name: fields.name,
            //             description: fields.description,
            //             url: fields.url,
            //             coverImage: fields.cover_image,
            //         };
            //     })
            //     .filter(
            //         (ticketProject) => !!ticketProject
            //     ) as TicketProjectProps[];

            setTicketProjects(ticketProjects);
        };

        getTicketProjects();
    }, []);

    return (
        <div className="p-3 flex flex-col gap-3">
            {ticketProjects.map((ticketProject, index) => (
                <TicketProject
                    key={`ticket-project-${index}`}
                    ticketProject={ticketProject}
                />
            ))}
        </div>
    );
};

export default TicketProjectList;
