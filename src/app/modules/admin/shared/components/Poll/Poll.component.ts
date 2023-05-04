import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PollService } from '../../services/poll.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
})
export class PollComponent implements OnInit {
  pollForm: FormGroup | undefined;
  options: string[] = [];
  optionCounts: { [key: string]: number } = {};
  @Output() savedChanges = new EventEmitter<{ [key: string]: number }>();
  keys: string[] | undefined = [];
  values: string[] | undefined = [];

  constructor(
    private formBuilder: FormBuilder,
    private pollService: PollService
  ) {}

  ngOnInit(): void {
    this.pollForm = this.formBuilder.group({
      question: ['', Validators.required],
      option: ['', Validators.required],
    });
  }

  addOption(): void {
    if (this.pollForm) {
      const option = this.pollForm.get('option')?.value;
      if (option && !this.options.includes(option)) {
        this.options.push(option);
        this.pollForm.get('option')?.reset();
      }
    }
  }

  removeOption(option: string): void {
    const index = this.options.indexOf(option);
    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }

  submit(): void {
    this.pollService.addPoll({
      question:this.pollForm?.value.question,
      keys: this.options.toString(),
      options: '',
    }).subscribe();
  }
  onClick(option: string) {
    console.log('Clicked', option);
    this.submitPoll(option);
    this.savedChanges.emit(this.optionCounts);
    console.log(this.optionCounts)
  }

  submitPoll(selectedOption: string): void {
    if (this.optionCounts[selectedOption]) {
      this.optionCounts[selectedOption]++;
    } else {
      this.optionCounts[selectedOption] = 1;
    }
  }
}
