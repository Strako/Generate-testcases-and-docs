/* eslint-disable no-console */
import { testcases } from "./data/testcases";

const headers = (title: string, content: string) => ({
  headers: {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    pragma: "no-cache",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    cookie:
      "_fbp=fb.0.1753337944421.890770175469251980; _ga=GA1.1.1486675443.1753337944; __stripe_mid=16229050-d504-4742-bada-2245418ec329290a94; _ga_WE7JYK3W5B=GS2.1.s1755900701$o4$g1$t1755904723$j60$l0$h0; NEXT_LOCALE=es; csrftoken=481q5R5n2wgydzSIqqVhgO1mXNgAfd8i; sessionid=40s7l3jj2p0cqp1tx15ukk5gpp1fuwlv; _dd_s=logs=1&id=bbff2c80-f5e5-439f-8b93-f74d7dc9332f&created=1756049370287&expire=1756051057191",
    Referer: "https://localhost/cases/new/",
  },
  body: `csrfmiddlewaretoken=L11FiDe712Nm2VvpiAZVC5VfmSug2nGOFZSVdk9kToTK5kdXyQK2IJMr9vAG7qEW&author=2&summary=${title}&default_tester=armando&product=4&category=5&case_status=1&priority=1&setup_duration=0&testing_duration=0&text=${content}&script=&arguments=&requirement=&extra_link=&notes=&email_settings-0-auto_to_case_author=on&email_settings-0-auto_to_run_manager=on&email_settings-0-auto_to_execution_assignee=on&email_settings-0-auto_to_case_tester=on&email_settings-0-auto_to_run_tester=on&email_settings-0-notify_on_case_update=on&email_settings-0-notify_on_case_delete=on&email_settings-0-cc_list=&email_settings-0-case=&email_settings-0-id=&email_settings-TOTAL_FORMS=1&email_settings-INITIAL_FORMS=0&email_settings-MIN_NUM_FORMS=0&email_settings-MAX_NUM_FORMS=1`,
  method: "POST",
});

const createTest = async (title: string, content: string) => {
  let response;
  try {
    response = await fetch(
      "https://localhost/cases/new/",
      headers(title, content),
    );

    if (response.ok) {
      const status = await response.status;
      console.log(status);
    }
  } catch (error) {
    console.warn(error, response);
  }
};

export default async function importTestCases() {
  for (const test of testcases) {
    await createTest(test.title, test.content);
  }
}
