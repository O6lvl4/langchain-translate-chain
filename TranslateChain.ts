/* eslint-disable quotes */
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Runnable, RunnableSequence } from "@langchain/core/runnables";
import { BaseLanguageModel } from "@langchain/core/language_models/base";
import { PromptTemplate } from "@langchain/core/prompts";

export const TRANSLATE_TEMPLATE = `
Translate the following text into English. Try to keep the content of the original text.

{output}`;

export interface TranslateChainInput {
  output: string;
}

export interface TranslateChainConfig {
  model: BaseLanguageModel;
}

export class TranslateChain extends Runnable<TranslateChainInput, string> {
  lc_namespace = ["translate_chain"];

  constructor(private config: TranslateChainConfig) {
    super();
  }

  async invoke(input: TranslateChainInput): Promise<string> {
    const { model } = this.config;
    const { output } = input;
    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(TRANSLATE_TEMPLATE),
      model,
      new StringOutputParser(),
    ]);
    return chain.invoke({ output });
  }
}
